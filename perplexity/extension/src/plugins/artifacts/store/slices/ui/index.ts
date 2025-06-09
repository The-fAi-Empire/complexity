import type { UISlice } from "@/plugins/artifacts/store/slices/ui/types";
import type { BoundStateCreator } from "@/plugins/artifacts/store/types";

export const createUISlice: BoundStateCreator<UISlice> = (set) => ({
  isArtifactsListOpen: false,

  openArtifactsList: () => {
    set({ isArtifactsListOpen: true, selectedCodeBlockLocation: null });
  },

  closeArtifactsList: () => set({ isArtifactsListOpen: false }),
});
