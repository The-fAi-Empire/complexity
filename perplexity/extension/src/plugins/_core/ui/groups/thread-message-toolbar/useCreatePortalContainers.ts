import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { useThreadMessageBlocksDomObserverStore } from "@/plugins/_core/dom-observers/thread/message-blocks/store";

const OBSERVER_ID = "cplx-thread-message-toolbar-extra-buttons-wrapper";

export function useCreatePortalContainers(): (Element | null)[] {
  const messageBlocks = useThreadMessageBlocksDomObserverStore(
    (state) => state.messageBlocks,
    deepEqual,
  );

  if (messageBlocks == null) return [];

  return messageBlocks.map((messageBlock) => {
    const $existingPortalContainer = messageBlock.nodes.$bottomBar.find(
      `div[data-cplx-component="${OBSERVER_ID}"]`,
    );

    if ($existingPortalContainer[0]) return $existingPortalContainer[0];

    const $portalContainer = $("<div>").internalComponentAttr(OBSERVER_ID);

    messageBlock.nodes.$bottomBar
      .find(
        DomSelectorsRegistry.cachedSync.THREAD.MESSAGE.BOTTOM_BAR_CHILD
          .COPY_BUTTON,
      )
      .before($portalContainer);

    return $portalContainer[0] ?? null;
  });
}
