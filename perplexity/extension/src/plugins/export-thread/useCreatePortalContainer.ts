import { useThreadDomObserverStore } from "@/plugins/_core/dom-observers/thread/store";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";

export default function useObserver() {
  const $overflowMenuButtonWrapper = useThreadDomObserverStore(
    (state) => state.$overflowMenuButtonWrapper,
    deepEqual,
  );

  return useMemo(() => {
    if ($overflowMenuButtonWrapper == null || !$overflowMenuButtonWrapper[0]) {
      $(
        `[data-cplx-component="${DomSelectorsService.internalAttributes.THREAD.NAVBAR_CHILD.EXPORT_THREAD_BUTTON}"]`,
      ).remove();

      return null;
    }

    const $wrapper = $($overflowMenuButtonWrapper[0]).parent();

    const $existingPortalContainer = $wrapper.find(
      `[data-cplx-component="${DomSelectorsService.internalAttributes.THREAD.NAVBAR_CHILD.EXPORT_THREAD_BUTTON}"]`,
    );

    if ($existingPortalContainer.length) return $existingPortalContainer[0];

    const $portalContainer = $("<div>").internalComponentAttr(
      DomSelectorsService.internalAttributes.THREAD.NAVBAR_CHILD
        .EXPORT_THREAD_BUTTON,
    );

    $wrapper.append($portalContainer);

    return $portalContainer[0];
  }, [$overflowMenuButtonWrapper]);
}
