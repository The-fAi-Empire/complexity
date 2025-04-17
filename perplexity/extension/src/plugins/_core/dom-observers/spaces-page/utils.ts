import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { spacesPageDomObserverStore } from "@/plugins/_core/dom-observers/spaces-page/store";

export function observeSpaceCard() {
  const $spaceCard = $(DomSelectorsRegistry.cachedSync.SPACES_PAGE.SPACE_CARD);

  if (!$spaceCard.length) return;

  const spaceCards = $spaceCard.toArray();

  spaceCards.forEach((spaceCard) => {
    const $spaceCard = $(spaceCard);

    if (
      spacesPageDomObserverStore.getState().spaceCards != null &&
      $spaceCard.internalComponentAttr() ===
        DomSelectorsRegistry.internalAttributes.SPACES_PAGE.SPACE_CARD
    )
      return;

    $spaceCard.internalComponentAttr(
      DomSelectorsRegistry.internalAttributes.SPACES_PAGE.SPACE_CARD,
    );
  });

  spacesPageDomObserverStore.setState({
    spaceCards: spaceCards.map((spaceCard) => $(spaceCard)),
  });
}
