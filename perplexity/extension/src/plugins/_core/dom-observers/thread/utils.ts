import { threadDomObserverStore } from "@/plugins/_core/dom-observers/thread/store";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";
import { setCssProperty } from "@/utils/utils";

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

  if (!document.body.style.getPropertyValue("--navbar-height") && $navbar[0]) {
    const navbarHeight = $navbar[0].offsetHeight;

    if (navbarHeight > 0) {
      setCssProperty("--navbar-height", `${navbarHeight}px`);
    }
  }

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

export function findMessageStickyHeaderHeight() {
  const $messageStickyHeader = $(
    DomSelectorsService.cachedSync.THREAD.MESSAGE.STICKY_HEADER,
  ).last();

  if (
    !$messageStickyHeader.length ||
    document.body.style.getPropertyValue(
      "--message-block-sticky-header-height",
    ) ||
    !$messageStickyHeader[0]
  )
    return;

  const stickyHeaderHeight = $messageStickyHeader[0].offsetHeight;

  if (stickyHeaderHeight > 0) {
    setCssProperty(
      "--message-block-sticky-header-height",
      `${stickyHeaderHeight}px`,
    );
  }

  threadDomObserverStore.setState({
    messageStickyHeaderHeight: stickyHeaderHeight,
  });
}
