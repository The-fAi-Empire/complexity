import { threadDomObserverStore } from "@/plugins/_core/dom-observers/thread/store";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";

export function findNavbar() {
  const $navbar = $(DomSelectorsService.cachedSync.THREAD.NAVBAR);

  if (
    threadDomObserverStore.getState().$navbar != null &&
    (!$navbar.length ||
      $navbar.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.THREAD.NAVBAR)
  )
    return;

  $navbar.internalComponentAttr(
    DomSelectorsService.internalAttributes.THREAD.NAVBAR,
  );

  threadDomObserverStore.setState({
    $navbar,
  });
}

export function findNavbarOverflowMenuButtonWrapper() {
  const $navbar = threadDomObserverStore.getState().$navbar;

  if (!$navbar || !$navbar[0]) return;

  const $overflowMenuButtonWrapper = $navbar.find(
    DomSelectorsService.cachedSync.SICKY_NAVBAR_CHILD
      .OVERFLOW_MENU_BUTTON_WRAPPER,
  );

  if (!$overflowMenuButtonWrapper[0]) {
    threadDomObserverStore.setState({
      $overflowMenuButtonWrapper: null,
    });

    return;
  }

  if (
    threadDomObserverStore.getState().$overflowMenuButtonWrapper != null &&
    $overflowMenuButtonWrapper.internalComponentAttr() ===
      DomSelectorsService.internalAttributes.THREAD.NAVBAR_CHILD
        .OVERFLOW_MENU_BUTTON_WRAPPER
  )
    return;

  $overflowMenuButtonWrapper.internalComponentAttr(
    DomSelectorsService.internalAttributes.THREAD.NAVBAR_CHILD
      .OVERFLOW_MENU_BUTTON_WRAPPER,
  );

  threadDomObserverStore.setState({
    $overflowMenuButtonWrapper,
  });
}

export function findWrapper() {
  const $wrapper = $(DomSelectorsService.cachedSync.THREAD.WRAPPER);

  if (
    threadDomObserverStore.getState().$wrapper != null &&
    (!$wrapper.length ||
      $wrapper.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.THREAD.WRAPPER)
  )
    return;

  $wrapper.internalComponentAttr(
    DomSelectorsService.internalAttributes.THREAD.WRAPPER,
  );

  threadDomObserverStore.setState({
    $wrapper,
  });
}

export function findPageWrapper() {
  const $pageWrapper = $(DomSelectorsService.cachedSync.THREAD.PAGE_WRAPPER);

  if (
    threadDomObserverStore.getState().$pageWrapper != null &&
    (!$pageWrapper.length ||
      $pageWrapper.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.THREAD.PAGE_WRAPPER)
  )
    return;

  $pageWrapper.internalComponentAttr(
    DomSelectorsService.internalAttributes.THREAD.PAGE_WRAPPER,
  );

  threadDomObserverStore.setState({
    $pageWrapper,
  });
}

export function findPopper() {
  const $popper = $(DomSelectorsService.cachedSync.THREAD.POPPER.DESKTOP);

  if (
    threadDomObserverStore.getState().$popper != null &&
    (!$popper.length ||
      $popper.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.THREAD.POPPER.DESKTOP)
  )
    return;

  $popper.internalComponentAttr(
    DomSelectorsService.internalAttributes.THREAD.POPPER.DESKTOP,
  );

  threadDomObserverStore.setState({
    $popper,
  });
}
