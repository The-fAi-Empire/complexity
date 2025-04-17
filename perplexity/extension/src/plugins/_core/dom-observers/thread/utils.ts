import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { threadDomObserverStore } from "@/plugins/_core/dom-observers/thread/store";
import { setCssProperty } from "@/utils/utils";

export function findNavbar() {
  const $navbar = $(DomSelectorsRegistry.cachedSync.THREAD.NAVBAR);

  if (
    threadDomObserverStore.getState().$navbar != null &&
    (!$navbar.length ||
      $navbar.internalComponentAttr() ===
        DomSelectorsRegistry.internalAttributes.THREAD.NAVBAR)
  )
    return;

  $navbar.internalComponentAttr(
    DomSelectorsRegistry.internalAttributes.THREAD.NAVBAR,
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
    DomSelectorsRegistry.cachedSync.SICKY_NAVBAR_CHILD
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
      DomSelectorsRegistry.internalAttributes.THREAD.NAVBAR_CHILD
        .OVERFLOW_MENU_BUTTON_WRAPPER
  )
    return;

  $overflowMenuButtonWrapper.internalComponentAttr(
    DomSelectorsRegistry.internalAttributes.THREAD.NAVBAR_CHILD
      .OVERFLOW_MENU_BUTTON_WRAPPER,
  );

  threadDomObserverStore.setState({
    $overflowMenuButtonWrapper,
  });
}

export function findWrapper() {
  const $wrapper = $(DomSelectorsRegistry.cachedSync.THREAD.WRAPPER);

  if (
    threadDomObserverStore.getState().$wrapper != null &&
    (!$wrapper.length ||
      $wrapper.internalComponentAttr() ===
        DomSelectorsRegistry.internalAttributes.THREAD.WRAPPER)
  )
    return;

  $wrapper.internalComponentAttr(
    DomSelectorsRegistry.internalAttributes.THREAD.WRAPPER,
  );

  threadDomObserverStore.setState({
    $wrapper,
  });
}

export function findPageWrapper() {
  const $pageWrapper = $(DomSelectorsRegistry.cachedSync.THREAD.PAGE_WRAPPER);

  if (
    threadDomObserverStore.getState().$pageWrapper != null &&
    (!$pageWrapper.length ||
      $pageWrapper.internalComponentAttr() ===
        DomSelectorsRegistry.internalAttributes.THREAD.PAGE_WRAPPER)
  )
    return;

  $pageWrapper.internalComponentAttr(
    DomSelectorsRegistry.internalAttributes.THREAD.PAGE_WRAPPER,
  );

  threadDomObserverStore.setState({
    $pageWrapper,
  });
}

export function findPopper() {
  const $popper = $(DomSelectorsRegistry.cachedSync.THREAD.POPPER.DESKTOP);

  if (
    threadDomObserverStore.getState().$popper != null &&
    (!$popper.length ||
      $popper.internalComponentAttr() ===
        DomSelectorsRegistry.internalAttributes.THREAD.POPPER.DESKTOP)
  )
    return;

  $popper.internalComponentAttr(
    DomSelectorsRegistry.internalAttributes.THREAD.POPPER.DESKTOP,
  );

  threadDomObserverStore.setState({
    $popper,
  });
}

export function findMessageStickyHeaderHeight() {
  const $messageStickyHeader = $(
    DomSelectorsRegistry.cachedSync.THREAD.MESSAGE.STICKY_HEADER,
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
