import type { TextboxSelection } from "@/utils/textarea-utils";

function getTextNodes(element: HTMLElement): Text[] {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  const nodes: Text[] = [];
  let node;
  while ((node = walker.nextNode())) {
    nodes.push(node as Text);
  }
  return nodes;
}

export function setSelection(
  element: HTMLElement,
  start: number,
  end: number,
): void {
  element.focus();
  if (start > end) {
    [start, end] = [end, start];
  }

  const sel = window.getSelection();
  if (!sel) return;

  const textNodes = getTextNodes(element);
  if (textNodes.length === 0 && start === 0 && end === 0) {
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    return;
  }

  let charCount = 0;
  let startNode: Node | null = null;
  let startOffset = 0;
  let endNode: Node | null = null;
  let endOffset = 0;

  for (const textNode of textNodes) {
    const textNodeLength = textNode.textContent?.length ?? 0;
    const nextCharCount = charCount + textNodeLength;

    if (startNode === null && start >= charCount && start <= nextCharCount) {
      startNode = textNode;
      startOffset = start - charCount;
    }

    if (endNode === null && end >= charCount && end <= nextCharCount) {
      endNode = textNode;
      endOffset = end - charCount;
    }

    if (startNode !== null && endNode !== null) break;
    charCount = nextCharCount;
  }

  // Handle cases where selection is at the very end
  if (startNode === null && textNodes.length > 0) {
    const lastNode = textNodes[textNodes.length - 1];
    if (lastNode) {
      startNode = lastNode;
      startOffset = lastNode.textContent?.length ?? 0;
    }
  }
  if (endNode === null && textNodes.length > 0) {
    const lastNode = textNodes[textNodes.length - 1];
    if (lastNode) {
      endNode = lastNode;
      endOffset = lastNode.textContent?.length ?? 0;
    }
  }

  if (startNode && endNode) {
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

export function getSelection(element: HTMLElement): TextboxSelection {
  const sel = window.getSelection();
  let start = 0;
  let end = 0;

  if (
    sel?.rangeCount != null &&
    sel.anchorNode &&
    element.contains(sel.anchorNode) &&
    sel.focusNode &&
    element.contains(sel.focusNode)
  ) {
    const range = sel.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(element);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    start = preSelectionRange.toString().length;
    end = start + range.toString().length;
  }

  return {
    start,
    end,
    value: element.textContent ?? "",
  };
}

export function insertText(_element: HTMLElement, text: string): void {
  document.execCommand("insertText", false, text);
}

export function deleteSelectedText(_element: HTMLElement): void {
  document.execCommand("insertText", false, "");
}

export function scrollIntoCaretView(_element: HTMLElement): void {
  const sel = window.getSelection();
  if (sel?.rangeCount == null) return;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  const parentElement = node.nodeType === 3 ? node.parentNode : node;
  if (parentElement instanceof HTMLElement) {
    parentElement.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

export function getWordAtCaret(element: HTMLElement) {
  const { start, end, value: text } = getSelection(element);

  if (start !== end) {
    return { value: text.substring(start, end), start, end };
  }

  const wordStart = text.slice(0, start).search(/\S+$/);
  const wordEnd = text.slice(start).search(/\s/);

  return {
    value: text.substring(
      wordStart,
      wordEnd === -1 ? text.length : start + wordEnd,
    ),
    start: wordStart,
    end: wordEnd === -1 ? text.length : start + wordEnd,
  };
}
