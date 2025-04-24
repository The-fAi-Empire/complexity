import { spacesPageDomObserverStore } from "@/plugins/_core/dom-observers/spaces-page/store";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";

export function observeSpaceCard() {
  const $spaceCard = $(DomSelectorsService.cachedSync.SPACES_PAGE.SPACE_CARD);

  if (!$spaceCard.length) return;

  const spaceCards = $spaceCard.toArray();

  spaceCards.forEach((spaceCard) => {
    const $spaceCard = $(spaceCard);

    if (
      spacesPageDomObserverStore.getState().spaceCards != null &&
      $spaceCard.internalComponentAttr() ===
        DomSelectorsService.internalAttributes.SPACES_PAGE.SPACE_CARD
    )
      return;

    $spaceCard.internalComponentAttr(
      DomSelectorsService.internalAttributes.SPACES_PAGE.SPACE_CARD,
    );
  });

  spacesPageDomObserverStore.setState({
    spaceCards: spaceCards.map((spaceCard) => $(spaceCard)),
  });
}
