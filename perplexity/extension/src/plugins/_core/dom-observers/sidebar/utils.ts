import { sidebarDomObserverStore } from "@/plugins/_core/dom-observers/sidebar/store";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";

export function findSidebarWrapper() {
  const $wrapper = $(DomSelectorsService.cachedSync.SIDEBAR.WRAPPER);

  if (!$wrapper.length) return;

  const isExpanded = $wrapper.hasClass("w-sideBarWidth");

  // ⚠️ Only update the attribute if it's different to avoid triggering mutation observer unnecessarily
  const currentState = $wrapper.attr("data-state");
  const newState = isExpanded ? "expanded" : "collapsed";
  if (currentState !== newState) {
    $wrapper.attr("data-state", newState);
  }

  if (
    sidebarDomObserverStore.getState().$wrapper != null &&
    $wrapper.internalComponentAttr() ===
      DomSelectorsService.internalAttributes.SIDEBAR.WRAPPER
  )
    return;

  $wrapper.internalComponentAttr(
    DomSelectorsService.internalAttributes.SIDEBAR.WRAPPER,
  );

  sidebarDomObserverStore.setState({
    $wrapper,
  });
}

export function findSpaceButtonWrapper() {
  const $wrapper = sidebarDomObserverStore.getState().$wrapper;

  if ($wrapper == null) return;

  const $spaceButtonWrapper = $wrapper.find(
    DomSelectorsService.cachedSync.SIDEBAR.SPACE_BUTTON_WRAPPER,
  );

  const isExpanded = $wrapper.attr("data-state") === "expanded";

  if (!isExpanded && $spaceButtonWrapper.length) {
    sidebarDomObserverStore.setState({
      $spaceButtonWrapper: null,
    });
    $spaceButtonWrapper.internalComponentAttr(null);
    return;
  }

  $spaceButtonWrapper
    .find(DomSelectorsService.cachedSync.SIDEBAR.SPACE_BUTTON)
    .addClass("x:group");

  if (
    sidebarDomObserverStore.getState().$spaceButtonWrapper != null &&
    (!$spaceButtonWrapper.length ||
      $spaceButtonWrapper.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.SIDEBAR.SPACE_BUTTON_WRAPPER)
  )
    return;

  $spaceButtonWrapper.internalComponentAttr(
    DomSelectorsService.internalAttributes.SIDEBAR.SPACE_BUTTON_WRAPPER,
  );

  sidebarDomObserverStore.setState({
    $spaceButtonWrapper,
  });
}

export function findSpaceButtonTriggerButtonsWrapper() {
  const $spaceButtonWrapper =
    sidebarDomObserverStore.getState().$spaceButtonWrapper;

  if ($spaceButtonWrapper == null) return;

  const $spaceButtonTriggerButtonsWrapper = $spaceButtonWrapper.find(
    DomSelectorsService.cachedSync.SIDEBAR.SPACE_BUTTON_WRAPPER_CHILD
      .TRIGGER_BUTTONS_PORTAL_CONTAINER,
  );

  if (
    !$spaceButtonTriggerButtonsWrapper.length ||
    $spaceButtonTriggerButtonsWrapper.internalComponentAttr() ===
      DomSelectorsService.internalAttributes.SIDEBAR
        .SPACE_BUTTON_TRIGGER_BUTTONS_PORTAL_CONTAINER
  )
    return;

  $spaceButtonTriggerButtonsWrapper.internalComponentAttr(
    DomSelectorsService.internalAttributes.SIDEBAR
      .SPACE_BUTTON_TRIGGER_BUTTONS_PORTAL_CONTAINER,
  );

  sidebarDomObserverStore.setState({
    $spaceButtonTriggerButtonsWrapper,
  });
}

export function findLibraryButtonWrapper() {
  const $wrapper = sidebarDomObserverStore.getState().$wrapper;

  if ($wrapper == null) return;

  const $libraryButtonWrapper = $wrapper.find(
    DomSelectorsService.cachedSync.SIDEBAR.LIBRARY_BUTTON_WRAPPER,
  );

  const isExpanded = $wrapper.attr("data-state") === "expanded";

  if (!isExpanded && $libraryButtonWrapper.length) {
    sidebarDomObserverStore.setState({
      $libraryButtonWrapper: null,
    });
    $libraryButtonWrapper.internalComponentAttr(null);
    return;
  }

  $libraryButtonWrapper
    .find(DomSelectorsService.cachedSync.SIDEBAR.LIBRARY_BUTTON)
    .addClass("x:group");

  if (
    sidebarDomObserverStore.getState().$libraryButtonWrapper != null &&
    (!$libraryButtonWrapper.length ||
      $libraryButtonWrapper.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.SIDEBAR.LIBRARY_BUTTON_WRAPPER)
  )
    return;

  $libraryButtonWrapper.internalComponentAttr(
    DomSelectorsService.internalAttributes.SIDEBAR.LIBRARY_BUTTON_WRAPPER,
  );

  sidebarDomObserverStore.setState({
    $libraryButtonWrapper,
  });
}

export function findLibraryButtonTriggerButtonsWrapper() {
  const $libraryButtonWrapper =
    sidebarDomObserverStore.getState().$libraryButtonWrapper;

  if ($libraryButtonWrapper == null) return;

  const $libraryButtonTriggerButtonsWrapper = $libraryButtonWrapper.find(
    DomSelectorsService.cachedSync.SIDEBAR.LIBRARY_BUTTON_WRAPPER_CHILD
      .TRIGGER_BUTTONS_PORTAL_CONTAINER,
  );

  if (
    sidebarDomObserverStore.getState().$libraryButtonTriggerButtonsWrapper !=
      null &&
    (!$libraryButtonTriggerButtonsWrapper.length ||
      $libraryButtonTriggerButtonsWrapper.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.SIDEBAR
          .LIBRARY_BUTTON_TRIGGER_BUTTONS_PORTAL_CONTAINER)
  )
    return;

  $libraryButtonTriggerButtonsWrapper.internalComponentAttr(
    DomSelectorsService.internalAttributes.SIDEBAR
      .LIBRARY_BUTTON_TRIGGER_BUTTONS_PORTAL_CONTAINER,
  );

  sidebarDomObserverStore.setState({
    $libraryButtonTriggerButtonsWrapper,
  });
}
