import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { homeDomObserverStore } from "@/plugins/_core/dom-observers/home/store";

export function findSlogan() {
  const $slogan = $(DomSelectorsRegistry.cachedSync.HOME.SLOGAN);

  if (
    homeDomObserverStore.getState().$slogan != null &&
    (!$slogan.length ||
      $slogan.internalComponentAttr() ===
        DomSelectorsRegistry.internalAttributes.HOME.SLOGAN)
  )
    return;

  $slogan.internalComponentAttr(
    DomSelectorsRegistry.internalAttributes.HOME.SLOGAN,
  );

  homeDomObserverStore.setState({
    $slogan,
  });
}

export function findBottomBar() {
  const $bottomBar = $(DomSelectorsRegistry.cachedSync.HOME.BOTTOM_BAR);

  if (
    homeDomObserverStore.getState().$bottomBar != null &&
    (!$bottomBar.length ||
      $bottomBar.internalComponentAttr() ===
        DomSelectorsRegistry.internalAttributes.HOME.BOTTOM_BAR)
  )
    return;

  $bottomBar.internalComponentAttr(
    DomSelectorsRegistry.internalAttributes.HOME.BOTTOM_BAR,
  );

  homeDomObserverStore.setState({
    $bottomBar,
  });
}

let previousLanguage = "";

export function observeLanguageSelector() {
  const ariaLabel =
    $(DomSelectorsRegistry.cachedSync.HOME.LANGUAGE_SELECTOR).attr(
      "aria-label",
    ) ?? "";

  if (!previousLanguage || ariaLabel === previousLanguage) {
    previousLanguage = ariaLabel;
    return;
  }

  window.location.reload();
}
