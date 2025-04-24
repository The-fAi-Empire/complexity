import { isMobileStore } from "@/hooks/use-is-mobile-store";
import { settingsPageDomObserverStore } from "@/plugins/_core/dom-observers/settings-page/store";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";

export function findSidebar() {
  const $sidebar = $(
    DomSelectorsService.cachedSync.SETTINGS_PAGE.SIDEBAR_WRAPPER,
  );

  if (!$sidebar.length) return;

  if (
    $sidebar.internalComponentAttr() !==
    DomSelectorsService.internalAttributes.SETTINGS_PAGE.SIDEBAR_WRAPPER
  ) {
    $sidebar.internalComponentAttr(
      DomSelectorsService.internalAttributes.SETTINGS_PAGE.SIDEBAR_WRAPPER,
    );
  } else {
    // the wrapper is persistent across settings routes, so we need to force the store to update
    if (
      !isMobileStore.getState().isMobile &&
      settingsPageDomObserverStore.getState().$sidebarWrapper != null
    ) {
      return;
    }
  }

  settingsPageDomObserverStore.setState({
    $sidebarWrapper: $sidebar,
  });
}
