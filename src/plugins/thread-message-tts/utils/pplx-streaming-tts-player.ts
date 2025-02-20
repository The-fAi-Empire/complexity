import { Howl } from "howler";

const AUDIO_CONFIG = {
  sampleRate: 44100,
  bytesPerSample: 2,
  pcmFormat: 1,
  wavHeaderSize: 44,
  channels: 1,
  bitsPerSample: 16,
} as const;

const WAV_HEADER = {
  riffChunkId: 0x52494646,
  waveFormat: 0x57415645,
  fmtChunkId: 0x666d7420,
  dataChunkId: 0x64617461,
} as const;

export class PplxStreamingTtsPlayer {
  private buffer: Int16Array[] = [];
  private currentSound: Howl | null = null;

  private speed: number = 1;

  private onStart: (() => void) | null = null;
  private onComplete: (() => void) | null = null;

  constructor({
    onStart,
    onComplete,
    speed,
  }: {
    onStart?: () => void;
    onComplete?: () => void;
    speed?: number;
  }) {
    this.onStart = onStart ?? null;
    this.onComplete = onComplete ?? null;
    this.speed = speed ?? 1;
  }

  private createWavHeader(dataLength: number): ArrayBuffer {
    const headerBuffer = new ArrayBuffer(AUDIO_CONFIG.wavHeaderSize);
    const view = new DataView(headerBuffer);

    view.setUint32(0, WAV_HEADER.riffChunkId, false);
    view.setUint32(4, 36 + dataLength, true);
    view.setUint32(8, WAV_HEADER.waveFormat, false);

    view.setUint32(12, WAV_HEADER.fmtChunkId, false);
    view.setUint32(16, 16, true);
    view.setUint16(20, AUDIO_CONFIG.pcmFormat, true);
    view.setUint16(22, AUDIO_CONFIG.channels, true);
    view.setUint32(24, AUDIO_CONFIG.sampleRate, true);
    view.setUint32(
      28,
      AUDIO_CONFIG.sampleRate * AUDIO_CONFIG.bytesPerSample,
      true,
    );
    view.setUint16(32, AUDIO_CONFIG.bytesPerSample, true);
    view.setUint16(34, AUDIO_CONFIG.bitsPerSample, true);

    view.setUint32(36, WAV_HEADER.dataChunkId, false);
    view.setUint32(40, dataLength, true);

    return headerBuffer;
  }

  private createWavBlob(audioData: Int16Array): Blob {
    const dataLength = audioData.length * AUDIO_CONFIG.bytesPerSample;
    const wavBuffer = new ArrayBuffer(AUDIO_CONFIG.wavHeaderSize + dataLength);

    new Uint8Array(wavBuffer).set(
      new Uint8Array(this.createWavHeader(dataLength)),
    );
    new Int16Array(wavBuffer, AUDIO_CONFIG.wavHeaderSize).set(audioData);

    return new Blob([wavBuffer], { type: "audio/wav" });
  }

  private handlePlaybackEnd(url: string) {
    URL.revokeObjectURL(url);
    this.buffer.shift();
    this.currentSound = null;
    this.playNextChunk();
  }

  public addChunk(chunk: Int16Array, autoPlay = true) {
    if (this.onStart && this.buffer.length === 0) {
      this.onStart();
    }

    this.buffer.push(chunk);
    if (autoPlay) {
      this.playNextChunk();
    }
  }

  public playNextChunk() {
    if (!this.buffer.length || this.currentSound?.playing()) {
      if (this.onComplete && this.buffer.length === 0) {
        this.onComplete();
      }
      return;
    }

    const audioChunk = this.buffer[0];
    if (!audioChunk) return;

    try {
      const blob = this.createWavBlob(audioChunk);
      const objectUrl = URL.createObjectURL(blob);

      this.currentSound = new Howl({
        src: [objectUrl],
        format: ["wav"],
        autoplay: true,
        rate: this.speed,
        onend: () => this.handlePlaybackEnd(objectUrl),
        onloaderror: () => this.handlePlaybackEnd(objectUrl),
      });
    } catch (error) {
      console.error("Audio playback failed:", error);
      this.buffer.shift();
      this.playNextChunk();
    }
  }

  public stop() {
    this.currentSound?.stop();
    this.currentSound?.unload();
    this.currentSound = null;
    this.buffer = [];
  }

  public setSpeed(speed: number) {
    this.speed = speed;
    if (this.currentSound) {
      this.currentSound.rate(speed);
    }
  }
}
