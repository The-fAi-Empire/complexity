import type { AnchorSlice } from "@/plugins/slash-command/store/slices/anchor";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";
import {
  deleteSelectedText,
  getTextareaSelection,
  getTextareaWordAtCaret,
  insertText,
  setTextareaSelection,
} from "@/utils/textarea-utils";
import { UiUtils } from "@/utils/ui-utils";

function isQueryBox(target: HTMLElement): target is HTMLTextAreaElement {
  const tagName = target.tagName;

  if (tagName !== "TEXTAREA") return false;

  return Object.entries(DomSelectorsService.cachedSync.QUERY_BOX.TEXTAREA).some(
    ([_, selector]) => target.matches(selector),
  );
}

function isEditQueryBox(target: HTMLElement): target is HTMLTextAreaElement {
  const tagName = target.tagName;

  if (tagName !== "TEXTAREA") return false;

  return target.matches(
    `${DomSelectorsService.cplxAttribute(
      DomSelectorsService.internalAttributes.THREAD.MESSAGE.QUERY,
    )} textarea`,
  );
}

function createTextareaContentActions(
  target: HTMLTextAreaElement,
): AnchorSlice["anchor"]["contentActions"] {
  return {
    setSelection: (selection) => {
      if (!selection) {
        setTextareaSelection(target, target.value.length, target.value.length);
        return;
      }

      setTextareaSelection(target, selection.start, selection.end);
    },
    getWordAtCaret: () => getTextareaWordAtCaret(target),
    getSelectedText: () => getTextareaSelection(target),
    insertText: (text: string) => {
      insertText(target, text);
      UiUtils.scrollIntoCaretView(target);
    },
    deleteTriggerPhrase: () => {
      const { start, end } = getTextareaWordAtCaret(target);

      setTextareaSelection(target, start, end);
      deleteSelectedText(target);
    },
    scrollIntoCaretView: () => UiUtils.scrollIntoCaretView(target),
    getSelection: () => getTextareaSelection(target),
  };
}

export function getAnchor(
  target: HTMLElement,
):
  | Pick<
      AnchorSlice["anchor"],
      "element" | "inputField" | "positioningOptions" | "contentActions"
    >
  | undefined {
  if (isQueryBox(target)) {
    const anchor = $(target).closest(
      DomSelectorsService.cachedSync.QUERY_BOX.WRAPPER,
    )[0];

    if (!anchor) return;

    return {
      element: anchor,
      inputField: target,
      positioningOptions: {
        placement: "bottom-start",
        gutter: 5,
        flip: true,
        hideWhenDetached: true,
        getAnchorRect: () => anchor.getBoundingClientRect(),
      },
      contentActions: createTextareaContentActions(target),
    };
  }

  if (isEditQueryBox(target)) {
    return {
      element: target,
      inputField: target,
      positioningOptions: {
        placement: "bottom",
        gutter: 10,
        flip: true,
        hideWhenDetached: true,
        getAnchorRect: () => target.getBoundingClientRect(),
      },
      contentActions: createTextareaContentActions(target),
    };
  }
}
