import { isLanguageModelCode } from "@/data/plugins/query-box/language-model-selector/language-models.types";
import { sharedQueryBoxStore } from "@/plugins/_core/ui-groups/query-box/shared-store";
import { INTERNAL_ATTRIBUTES } from "@/utils/dom-selectors";

export function createToolbarPortalContainers(queryBox: HTMLElement): {
  leftContainer: HTMLElement | null;
  rightContainer: HTMLElement | null;
} {
  const $textareaWrapper = $(queryBox).find("textarea").parent();

  const $queryBoxComponentsWrapper = $textareaWrapper.parent();

  $queryBoxComponentsWrapper.internalComponentAttr(
    INTERNAL_ATTRIBUTES.QUERY_BOX_CHILD.COMPONENTS_WRAPPER,
  );

  const $toolbar = $queryBoxComponentsWrapper.find(">div:nth-child(2)");

  $toolbar
    .find(">div.flex:first-child")
    .internalComponentAttr(
      INTERNAL_ATTRIBUTES.QUERY_BOX_CHILD.PPLX_COMPONENTS_WRAPPER,
    );

  const $leftContainer = (() => {
    if (!$toolbar.length) return null;

    const $existingLeftContainer = $toolbar.find(
      `[data-cplx-component="${
        INTERNAL_ATTRIBUTES.QUERY_BOX_CHILD.CPLX_COMPONENTS_LEFT_WRAPPER
      }"]`,
    );

    if ($existingLeftContainer.length) return $existingLeftContainer;

    const $newLeftContainer = $("<x:div>").addClass("x:[&:empty]:hidden");

    $newLeftContainer.internalComponentAttr(
      INTERNAL_ATTRIBUTES.QUERY_BOX_CHILD.CPLX_COMPONENTS_LEFT_WRAPPER,
    );

    $toolbar.prepend($newLeftContainer);

    return $newLeftContainer;
  })();

  const $rightContainer = (() => {
    if (!$toolbar.length) return null;

    const $existingRightContainer = $toolbar.find(
      `[data-cplx-component="${
        INTERNAL_ATTRIBUTES.QUERY_BOX_CHILD.CPLX_COMPONENTS_RIGHT_WRAPPER
      }"]`,
    );

    if ($existingRightContainer.length) return $existingRightContainer;

    const $newRightContainer = $("<x:div>").addClass("x:[&:empty]:hidden");

    $newRightContainer.internalComponentAttr(
      INTERNAL_ATTRIBUTES.QUERY_BOX_CHILD.CPLX_COMPONENTS_RIGHT_WRAPPER,
    );

    $toolbar.append($newRightContainer);

    return $newRightContainer;
  })();

  return {
    leftContainer: $leftContainer?.[0] ?? null,
    rightContainer: $rightContainer?.[0] ?? null,
  };
}

export function populateDefaults() {
  const selectedLanguageModel = localStorage.getItem("cplx.selected-model");

  if (!selectedLanguageModel || !isLanguageModelCode(selectedLanguageModel)) {
    return;
  }

  sharedQueryBoxStore
    .getState()
    .setSelectedLanguageModel(selectedLanguageModel);
}
