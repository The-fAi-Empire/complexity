import type { ArtifactState } from "@/plugins/artifacts/types";

export interface ArtifactStateSlice {
  state: ArtifactState;
  setState: (state: ArtifactState) => void;
  isValidArtifactCode: boolean;
  hasAutoPreviewTriggered: boolean;
  setHasAutoPreviewTriggered: (value: boolean) => void;
}
