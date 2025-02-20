import { FaStopCircle } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { LuLoaderCircle } from "react-icons/lu";
import { sendMessage } from "webext-bridge/content-script";

import Tooltip from "@/components/Tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TTS_VOICES, TtsVoice } from "@/data/plugins/thread-message-tts/types";
import usePplxTtsRequest from "@/plugins/thread-message-tts/hooks/usePplxTtsRequest";
import { PplxTtsPlayerCoordinator } from "@/plugins/thread-message-tts/utils/coordinator";
import { ExtensionLocalStorageService } from "@/services/extension-local-storage";

export default function ThreadMessageTtsButton({
  messageBlockIndex,
}: {
  messageBlockIndex: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [firstChunkArrived, setFirstChunkArrived] = useState(false);

  const {
    mutation: { mutateAsync: playTts },
    abort,
  } = usePplxTtsRequest();

  const [player] = useState(() =>
    PplxTtsPlayerCoordinator.getInstance().createPlayer({
      onStart: () => {
        setFirstChunkArrived(true);
      },
      onComplete: () => {
        setIsPlaying(false);
      },
      stop: () => {
        setIsPlaying(false);
        setFirstChunkArrived(false);
        abort();
      },
    }),
  );

  const stop = useCallback(() => {
    PplxTtsPlayerCoordinator.getInstance().stopAllPlayers();
  }, []);

  const initTts = useCallback(
    async (params?: { voice: TtsVoice }) => {
      stop();

      if (isPlaying) {
        return;
      }

      setIsPlaying(true);

      const backendUuid = await sendMessage(
        "reactVdom:getMessageBackendUuid",
        {
          index: messageBlockIndex,
        },
        "window",
      );

      if (backendUuid == null) {
        setIsPlaying(false);
        return;
      }

      playTts({
        backendUuid,
        voice:
          params?.voice ??
          (await ExtensionLocalStorageService.get()).plugins[
            "thread:messageTts"
          ].voice,
        onBufferUpdate(chunk) {
          player.addChunk(chunk);
        },
      });
    },
    [isPlaying, stop, messageBlockIndex, playTts, player],
  );

  useEffect(() => {
    return () => {
      stop();
      PplxTtsPlayerCoordinator.getInstance().removePlayer(player);
    };
  }, [player, stop]);

  if (isPlaying && !firstChunkArrived) {
    return (
      <div className="x-rounded-md x-p-2 x-text-muted-foreground">
        <LuLoaderCircle className="x-size-4 x-animate-spin" />
      </div>
    );
  }

  return (
    <DropdownMenu
      lazyMount
      unmountOnExit
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
      onSelect={({ value }) => {
        initTts({ voice: value as TtsVoice });
        ExtensionLocalStorageService.set((draft) => {
          draft.plugins["thread:messageTts"].voice = value as TtsVoice;
        });
      }}
    >
      <Tooltip content={isPlaying ? t("misc.stop") : t("misc.speakAloud")}>
        <DropdownMenuTrigger asChild>
          <div
            className="x-cursor-pointer x-rounded-md x-p-2 x-text-muted-foreground x-transition-all hover:x-bg-secondary hover:x-text-foreground active:x-scale-95"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isOpen) {
                return;
              }
              initTts();
            }}
            onContextMenu={(e) => {
              if (isPlaying) {
                return;
              }

              e.preventDefault();
              setIsOpen(true);
            }}
          >
            {isPlaying ? (
              <FaStopCircle className="x-size-4 x-text-primary" />
            ) : (
              <HiOutlineSpeakerWave className="x-size-4" />
            )}
          </div>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent>
        {TTS_VOICES.map((voice) => (
          <DropdownMenuItem key={voice} value={voice}>
            {voice}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
