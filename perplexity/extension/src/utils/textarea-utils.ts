type TextareaSelection = {
  start: number;
  end: number;
  value: string;
};

export const setTextareaSelection = (
  textarea: HTMLTextAreaElement,
  start: number,
  end: number,
): void => {
  textarea.focus();
  textarea.setSelectionRange(start, end);
};

export const getTextareaSelection = (
  textarea: HTMLTextAreaElement,
): TextareaSelection => ({
  start: textarea.selectionStart,
  end: textarea.selectionEnd,
  value: textarea.value,
});

export const insertText = (
  textarea: HTMLTextAreaElement,
  text: string,
): void => {
  textarea.focus();
  document.execCommand("insertText", false, text);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
};

export const deleteSelectedText = (textarea: HTMLTextAreaElement): void => {
  textarea.focus();
  document.execCommand("delete", false, undefined);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
};

export const getTextareaWordAtCaret = (textarea: HTMLTextAreaElement) => {
  const { start, end, value } = getTextareaSelection(textarea);

  if (start !== end) {
    return {
      value: "",
      start: start,
      end: end,
    };
  }

  const text = value;
  let wordStart = start;
  let wordEnd = end;

  while (wordStart > 0 && !/\s/.test(text.charAt(wordStart - 1))) {
    wordStart--;
  }

  while (wordEnd < text.length && !/\s/.test(text.charAt(wordEnd))) {
    wordEnd++;
  }

  return {
    value: text.substring(wordStart, wordEnd),
    start: wordStart,
    end: wordEnd,
  };
};
