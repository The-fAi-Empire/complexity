import type { BlocksSlice } from "@/plugins/artifacts/store/slices/blocks/types";
import type { BoundStateCreator } from "@/plugins/artifacts/store/types";

export const createBlocksSlice: BoundStateCreator<BlocksSlice> = () => ({
  artifactBlocks: {},
});
