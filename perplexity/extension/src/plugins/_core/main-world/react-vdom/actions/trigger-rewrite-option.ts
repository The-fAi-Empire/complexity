import { findReactFiberNodeValue } from "@/plugins/_core/main-world/react-vdom/utils";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";
import { errorWrapper } from "@/utils/error-wrapper";
import { getReactFiberKey } from "@/utils/utils";

export function triggerRewriteOption(params: {
  messageBlockIndex: number;
  optionIndex?: number;
}): boolean {
  const { messageBlockIndex, optionIndex } = params;
  const selector = `div[data-cplx-component="${DomSelectorsService.internalAttributes.THREAD.MESSAGE.BLOCK}"][data-index="${messageBlockIndex}"] [data-cplx-component="${DomSelectorsService.internalAttributes.THREAD.MESSAGE.BOTTOM_BAR}"] ${DomSelectorsService.cachedSync.THREAD.MESSAGE.BOTTOM_BAR_CHILD.REWRITE_BUTTON}`;

  const $rewriteButtonWrapper = $(selector).parent().parent();

  if (!$rewriteButtonWrapper[0]) return false;

  const fiberNode = ($rewriteButtonWrapper[0] as any)[
    getReactFiberKey($rewriteButtonWrapper[0])
  ];

  if (fiberNode == null) return false;

  const [triggerRewriteOptionHandler, error] = errorWrapper(() =>
    findReactFiberNodeValue({
      fiberNode,
      condition: (node) => {
        const items = node.memoizedProps.children.props.items;
        const index = optionIndex ?? items.length - 3;
        return items[index].onClick != null;
      },
      select: (node) => {
        const items = node.memoizedProps.children.props.items;
        const index = optionIndex ?? items.length - 3;
        return items[index].onClick as () => void;
      },
    }),
  )();

  if (error || triggerRewriteOptionHandler == null) return false;

  triggerRewriteOptionHandler();

  return true;
}
