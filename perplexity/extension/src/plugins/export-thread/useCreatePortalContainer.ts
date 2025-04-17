import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { useThreadDomObserverStore } from "@/plugins/_core/dom-observers/thread/store";

export default function useObserver() {
  const $overflowMenuButtonWrapper = useThreadDomObserverStore(
    (state) => state.$overflowMenuButtonWrapper,
    deepEqual,
  );

  return useMemo(() => {
    if ($overflowMenuButtonWrapper == null || !$overflowMenuButtonWrapper[0]) {
      $(
        `[data-cplx-component="${DomSelectorsRegistry.internalAttributes.THREAD.NAVBAR_CHILD.EXPORT_THREAD_BUTTON}"]`,
      ).remove();

      return null;
    }

    const $wrapper = $($overflowMenuButtonWrapper[0]).parent();

    const $existingPortalContainer = $wrapper.find(
      `[data-cplx-component="${DomSelectorsRegistry.internalAttributes.THREAD.NAVBAR_CHILD.EXPORT_THREAD_BUTTON}"]`,
    );

    if ($existingPortalContainer.length) return $existingPortalContainer[0];

    const $portalContainer = $("<div>").internalComponentAttr(
      DomSelectorsRegistry.internalAttributes.THREAD.NAVBAR_CHILD
        .EXPORT_THREAD_BUTTON,
    );

    $wrapper.append($portalContainer);

    return $portalContainer[0];
  }, [$overflowMenuButtonWrapper]);
}
