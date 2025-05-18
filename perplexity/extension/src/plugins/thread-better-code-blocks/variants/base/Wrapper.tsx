import { useCanvasStore } from "@/plugins/canvas/index.public";
import { useMirroredCodeBlockContext } from "@/plugins/thread-better-code-blocks/MirroredCodeBlockContext";
import BetterCodeBlockHeader from "@/plugins/thread-better-code-blocks/variants/base/Header";
import HighlightedCodeWrapper from "@/plugins/thread-better-code-blocks/variants/HighlightedCode";
import { PluginsStatesService } from "@/services/plugins-states";

const BaseCodeBlockWrapper = memo(function BaseCodeBlockWrapper() {
  const { maxHeight, sourceMessageBlockIndex, sourceCodeBlockIndex } =
    useMirroredCodeBlockContext();

  const isCanvasEnabled =
    PluginsStatesService.cachedEnableStates?.["thread:canvas"];
  const selectedCanvasCodeBlockLocation = useCanvasStore(
    (state) => state.selectedCodeBlockLocation,
  );
  const isSelectedCanvasCodeBlock =
    selectedCanvasCodeBlockLocation?.messageBlockIndex ===
      sourceMessageBlockIndex &&
    selectedCanvasCodeBlockLocation?.codeBlockIndex === sourceCodeBlockIndex;

  return (
    <div
      className={cn(
        "x:relative x:my-4 x:flex x:flex-col x:rounded-lg x:border x:border-border/50 x:bg-secondary x:font-mono x:transition-all",
        {
          "x:overflow-hidden": maxHeight === 0,
          "x:border-primary": isCanvasEnabled && isSelectedCanvasCodeBlock,
        },
      )}
    >
      <BetterCodeBlockHeader />
      <HighlightedCodeWrapper />
    </div>
  );
});

export default BaseCodeBlockWrapper;
