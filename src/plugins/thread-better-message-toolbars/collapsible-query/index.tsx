import { Portal } from "@/components/ui/portal";
import { useInsertCss } from "@/hooks/useInsertCss";
import { useThreadMessageBlocksDomObserverStore } from "@/plugins/_core/dom-observers/thread/message-blocks/store";
import collapsibleQueryCss from "@/plugins/thread-better-message-toolbars/collapsible-query/collapsible-query.css?inline";
import CollapsibleQueryToggleButton from "@/plugins/thread-better-message-toolbars/collapsible-query/CollapsibleQueryToggleButton";

export default function CollapsibleQueryWrapper() {
  const $queryHoverContainersButtonsWrapper =
    useThreadMessageBlocksDomObserverStore((store) =>
      store.messageBlocks?.map((block) => {
        if (block.states.isEditingQuery || block.states.isInFlight) return null;
        return block.nodes.$queryHoverContainer.find(">div.bg-background-100");
      }),
    );

  useInsertCss({
    css: collapsibleQueryCss,
    id: "collapsible-query",
  });

  if (
    $queryHoverContainersButtonsWrapper == null ||
    !$queryHoverContainersButtonsWrapper.length
  )
    return null;

  return $queryHoverContainersButtonsWrapper.map(
    ($queryHoverContainer, index) => {
      if (!$queryHoverContainer) return null;

      return (
        <Portal key={index} container={$queryHoverContainer[0]}>
          <CollapsibleQueryToggleButton messageIndex={index} />
        </Portal>
      );
    },
  );
}
