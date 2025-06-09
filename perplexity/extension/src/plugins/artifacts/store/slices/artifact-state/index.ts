import type { ArtifactStateSlice } from "@/plugins/artifacts/store/slices/artifact-state/types";
import type { BoundStateCreator } from "@/plugins/artifacts/store/types";
import type { ArtifactState } from "@/plugins/artifacts/types";

export const createArtifactStateSlice: BoundStateCreator<ArtifactStateSlice> = (
  set,
) => ({
  state: "code" as ArtifactState,
  isValidArtifactCode: false,
  hasAutoPreviewTriggered: false,

  setState: (state) => set({ state }),

  setHasAutoPreviewTriggered: (value) =>
    set({ hasAutoPreviewTriggered: value }),
});
