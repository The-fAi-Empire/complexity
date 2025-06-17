import { isContentEditable } from "@/plugins/_core/ui/groups/query-box/utils";
import * as contenteditableUtils from "@/utils/contenteditable-utils";
import * as textareaUtils from "@/utils/textarea-utils";
import { UiUtils } from "@/utils/ui-utils";

type TextboxUtils = typeof contenteditableUtils | typeof textareaUtils;

function getUtils(element: HTMLElement): TextboxUtils {
  return isContentEditable(element) ? contenteditableUtils : textareaUtils;
}

export function createTextboxAdapter(element: HTMLElement) {
  const utils = getUtils(element);

  const scrollIntoCaretView = () => {
    if (isContentEditable(element)) {
      contenteditableUtils.scrollIntoCaretView(element);
    } else {
      UiUtils.scrollIntoCaretView(element as HTMLTextAreaElement);
    }
  };

  const deleteSelectedText = () => {
    if (isContentEditable(element)) {
      requestAnimationFrame(() => {
        contenteditableUtils.deleteSelectedText(element);
      });
    } else {
      textareaUtils.deleteSelectedText(element as HTMLTextAreaElement);
    }
  };

  const getTextLength = () => {
    return isContentEditable(element)
      ? (element.textContent?.length ?? 0)
      : (element as HTMLTextAreaElement).value.length;
  };

  return {
    setSelection: (selection?: { start: number; end: number } | null) => {
      const position = selection ?? {
        start: getTextLength(),
        end: getTextLength(),
      };
      utils.setSelection(element as any, position.start, position.end);
    },
    getWordAtCaret: () => utils.getWordAtCaret(element as any),
    getSelectedText: () => utils.getSelection(element as any),
    insertText: (text: string) => {
      utils.insertText(element as any, text);
      scrollIntoCaretView();
    },
    deleteTriggerPhrase: () => {
      const { start, end } = utils.getWordAtCaret(element as any);
      utils.setSelection(element as any, start, end);
      deleteSelectedText();
    },
    scrollIntoCaretView,
    getSelection: () => utils.getSelection(element as any),
  };
}
