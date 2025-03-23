import { MessageBlock } from "@/plugins/_core/dom-observers/thread/message-blocks/types";
import { threadDomObserverStore } from "@/plugins/_core/dom-observers/thread/store";
import { INTERNAL_ATTRIBUTES, DOM_SELECTORS } from "@/utils/dom-selectors";
import { setCssProperty } from "@/utils/utils";

export async function findMessageBlocks(): Promise<MessageBlock[] | null> {
  const $threadWrapper = threadDomObserverStore.getState().$wrapper;

  if ($threadWrapper == null || !$threadWrapper.length) return null;

  const rawMessageBlocks = $threadWrapper.find(
    DOM_SELECTORS.THREAD.MESSAGE.WRAPPER,
  );

  const messageBlocks = await Promise.all(
    rawMessageBlocks.map(async (i, messageBlock) => {
      if (messageBlock == null) return null;

      const $wrapper = $(messageBlock as HTMLElement);

      $wrapper
        .internalComponentAttr(INTERNAL_ATTRIBUTES.THREAD.MESSAGE.BLOCK)
        .attr("data-index", i);

      const parsedBlock = parseMessageBlock($wrapper);
      const { $query, $queryHoverContainer, $sources, $answer, $bottomBar } =
        parsedBlock;

      $query.internalComponentAttr(INTERNAL_ATTRIBUTES.THREAD.MESSAGE.QUERY);
      $queryHoverContainer.internalComponentAttr(
        INTERNAL_ATTRIBUTES.THREAD.MESSAGE.QUERY_HOVER_CONTAINER,
      );
      $answer.internalComponentAttr(INTERNAL_ATTRIBUTES.THREAD.MESSAGE.ANSWER);
      $bottomBar.internalComponentAttr(
        INTERNAL_ATTRIBUTES.THREAD.MESSAGE.BOTTOM_BAR,
      );

      const nodes: MessageBlock["nodes"] = {
        $wrapper,
        $query,
        $sources,
        $answer,
        $queryHoverContainer,
        $bottomBar,
      };

      const content = getMessageBlockContent({ messageBlockNodes: nodes });
      const states = getMessageBlockStates({
        messageBlockNodes: nodes,
      });

      return {
        nodes,
        content,
        states,
      };
    }),
  );

  return messageBlocks.filter((block): block is MessageBlock => block !== null);
}

function parseMessageBlock($messageBlock: JQuery<Element>) {
  const selectors = DOM_SELECTORS.THREAD.MESSAGE;

  const $query = $messageBlock.find(selectors.QUERY_WRAPPER);
  const $queryHoverContainer = $query.find(selectors.QUERY_HOVER_CONTAINER);
  const $sources = $messageBlock.find(selectors.SOURCES);
  const $answer = $messageBlock.find(selectors.ANSWER);
  const $bottomBar = $messageBlock.find(selectors.BOTTOM_BAR);

  if ($bottomBar.length) {
    const newHeight = `${$bottomBar[0].offsetHeight}px`;
    const currentValue = getComputedStyle(document.body).getPropertyValue(
      "--message-block-bottom-bar-height",
    );

    if (currentValue !== newHeight) {
      setCssProperty("--message-block-bottom-bar-height", newHeight);
    }
  }

  return {
    $messageBlock,
    $query,
    $queryHoverContainer,
    $sources,
    $answer,
    $bottomBar,
  };
}

function getMessageBlockStates({
  messageBlockNodes,
}: {
  messageBlockNodes: MessageBlock["nodes"];
}): MessageBlock["states"] {
  const { $wrapper, $query, $bottomBar } = messageBlockNodes;

  const isInFlight = !$bottomBar.length;

  $wrapper.attr("data-inflight", isInFlight ? "true" : "false");

  const isEditingQuery = $query.find("textarea").length > 0;
  const isQueryHoverContainerPresent =
    $query.find(DOM_SELECTORS.THREAD.MESSAGE.QUERY_HOVER_CONTAINER).length > 0;

  const existingReadOnlyAttr = $wrapper.attr("data-read-only");

  if (existingReadOnlyAttr == null || existingReadOnlyAttr === "true") {
    $wrapper.attr(
      "data-read-only",
      !isQueryHoverContainerPresent ? "true" : "false",
    );
  }

  const isReadOnly =
    existingReadOnlyAttr !== "false" ? !isQueryHoverContainerPresent : false;

  return {
    isInFlight,
    isEditingQuery,
    isReadOnly,
  };
}

function getMessageBlockContent({
  messageBlockNodes,
}: {
  messageBlockNodes: MessageBlock["nodes"];
}): MessageBlock["content"] {
  const { $query } = messageBlockNodes;

  const title = $query.find(DOM_SELECTORS.THREAD.MESSAGE.QUERY).text();

  return {
    title,
  };
}
