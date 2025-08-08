import { sendMessage } from "webext-bridge/content-script";

import { messageBlocksReactFiberNodePathResourceConfig } from "@/plugins/_core/dom-observers/thread/message-blocks/index.remote-resources";
import type { MessageBlock } from "@/plugins/_core/dom-observers/thread/message-blocks/types";
import { type MessageBlockFiberData } from "@/plugins/_core/main-world/react-vdom/actions/get-messages";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";
import { getVersionedRemoteResource } from "@/services/cplx-api/versioned-remote-resources/utils";

const remoteFiberNodePath = (
  await getVersionedRemoteResource(
    messageBlocksReactFiberNodePathResourceConfig,
  )
).split(".");

export async function findMessageBlocks(
  $threadMessagesContainer: JQuery<HTMLElement>,
): Promise<MessageBlock[] | null> {
  if (!$threadMessagesContainer[0]) return null;

  const $messageBlockElements = $threadMessagesContainer.find(
    `>${DomSelectorsService.cachedSync.THREAD.MESSAGE.OUTER_WRAPPER}`,
  );

  const messageBlocksFiberData = await sendMessage(
    "reactVdom:getMessages",
    {
      remoteFiberNodePath: remoteFiberNodePath ?? undefined,
    },
    "window",
  );

  const messageBlocksPromises = $messageBlockElements
    .toArray()
    .map((messageBlockNode, idx) => {
      return processMessageBlock(
        messageBlocksFiberData?.[idx],
        $(messageBlockNode),
        idx,
      );
    });

  const resolvedMessageBlocks = await Promise.all(messageBlocksPromises);

  return resolvedMessageBlocks.filter(Boolean) as MessageBlock[];
}

async function processMessageBlock(
  messageBlockFiber: MessageBlockFiberData | undefined,
  $wrapper: JQuery<HTMLElement>,
  index: number,
): Promise<MessageBlock | null> {
  $wrapper
    .internalComponentAttr(
      DomSelectorsService.internalAttributes.THREAD.MESSAGE.BLOCK,
    )
    .attr("data-index", index);

  const parsedBlock = parseMessageBlock($wrapper);
  const { $query, $queryEditButtonGroup, $sources, $answer, $footer } =
    parsedBlock;

  const nodes: MessageBlock["nodes"] = {
    $wrapper,
    $query,
    $sources,
    $answer,
    $queryEditButtonGroup,
    $footer,
  };

  const content: MessageBlock["content"] = {
    title:
      messageBlockFiber?.title ??
      $query.find(DomSelectorsService.cachedSync.THREAD.MESSAGE.QUERY).text(),
    answer: messageBlockFiber?.answer ?? "",
    webResults: messageBlockFiber?.webResults ?? [],
    displayModel: messageBlockFiber?.displayModel ?? "",
    backendUuid: messageBlockFiber?.backendUuid ?? "",
    authorUuid: messageBlockFiber?.authorUuid ?? "",
  };

  const states: MessageBlock["states"] = getMessageBlockStates({
    messageBlockNodes: nodes,
    messageBlockFiber,
  });

  return {
    nodes,
    content,
    states,
  };
}

function parseMessageBlock($messageBlock: JQuery<Element>) {
  const selectors = DomSelectorsService.cachedSync.THREAD.MESSAGE;

  const $elements = $messageBlock.find(
    [
      selectors.QUERY_WRAPPER,
      selectors.SOURCES,
      selectors.ANSWER,
      selectors.FOOTER,
    ].join(", "),
  );

  const $query = $elements.filter(selectors.QUERY_WRAPPER);
  const $sources = $elements.filter(selectors.SOURCES);
  const $answer = $elements.filter(selectors.ANSWER);
  const $footer = $elements.filter(selectors.FOOTER);

  const $queryEditButtonGroup = $query.find(selectors.QUERY_EDIT_BUTTON_GROUP);

  $query.internalComponentAttr(
    DomSelectorsService.internalAttributes.THREAD.MESSAGE.QUERY,
  );
  $queryEditButtonGroup.internalComponentAttr(
    DomSelectorsService.internalAttributes.THREAD.MESSAGE
      .QUERY_EDIT_BUTTON_GROUP,
  );
  $answer.internalComponentAttr(
    DomSelectorsService.internalAttributes.THREAD.MESSAGE.ANSWER,
  );
  $footer.internalComponentAttr(
    DomSelectorsService.internalAttributes.THREAD.MESSAGE.FOOTER,
  );

  return {
    $messageBlock,
    $query,
    $queryEditButtonGroup,
    $sources,
    $answer,
    $footer,
  };
}

function getMessageBlockStates({
  messageBlockNodes,
  messageBlockFiber,
}: {
  messageBlockNodes: MessageBlock["nodes"];
  messageBlockFiber: MessageBlockFiberData | undefined;
}): MessageBlock["states"] {
  const { $wrapper, $query, $footer } = messageBlockNodes;

  const hasInnerWrapper =
    $wrapper.find(DomSelectorsService.cachedSync.THREAD.MESSAGE.INNER_WRAPPER)
      .length > 0;
  const isVirtualized = !hasInnerWrapper;

  const isInFlight = isVirtualized
    ? false
    : (messageBlockFiber?.isInFlight ?? $footer[0] == null);

  $wrapper.attr("data-inflight", isInFlight ? "true" : "false");

  const isEditingQuery =
    $query.find(DomSelectorsService.cachedSync.QUERY_BOX.TEXTBOX.EDIT_QUERY)
      .length > 0;

  const isReadOnly = (() => {
    const existingReadOnlyAttr = $wrapper.attr("data-read-only");

    if (existingReadOnlyAttr != null && existingReadOnlyAttr === "false")
      return false;

    const isQueryEditButtonGroupPresent =
      $query.find(
        DomSelectorsService.cachedSync.THREAD.MESSAGE.QUERY_EDIT_BUTTON_GROUP,
      ).length > 0;

    $wrapper.attr(
      "data-read-only",
      isQueryEditButtonGroupPresent ? "false" : "true",
    );

    return !isQueryEditButtonGroupPresent;
  })();

  return {
    isReadOnly,
    isInFlight,
    isEditingQuery,
    isVirtualized,
  };
}
