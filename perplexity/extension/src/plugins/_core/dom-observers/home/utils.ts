import { homeDomObserverStore } from "@/plugins/_core/dom-observers/home/store";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";

export function findSlogan() {
  const $slogan = $(DomSelectorsService.cachedSync.HOME.SLOGAN);

  if (
    homeDomObserverStore.getState().$slogan != null &&
    (!$slogan.length ||
      $slogan.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.HOME.SLOGAN)
  )
    return;

  $slogan.internalComponentAttr(
    DomSelectorsService.internalAttributes.HOME.SLOGAN,
  );

  homeDomObserverStore.setState({
    $slogan,
  });
}

export function findBottomBar() {
  const $bottomBar = $(DomSelectorsService.cachedSync.HOME.BOTTOM_BAR);

  if (
    homeDomObserverStore.getState().$bottomBar != null &&
    (!$bottomBar.length ||
      $bottomBar.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.HOME.BOTTOM_BAR)
  )
    return;

  $bottomBar.internalComponentAttr(
    DomSelectorsService.internalAttributes.HOME.BOTTOM_BAR,
  );

  homeDomObserverStore.setState({
    $bottomBar,
  });
}
