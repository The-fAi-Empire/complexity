import {
  CallbackQueue,
  createTaskId,
} from "@/plugins/_api/dom-observer/callback-queue";
import { DomObserver } from "@/plugins/_api/dom-observer/dom-observer";
import { createDomObserverId } from "@/plugins/_api/dom-observer/dom-observer.types";
import { threadDomObserverStore } from "@/plugins/_core/dom-observers/thread/store";
import {
  findNavbarOverflowMenuButtonWrapper,
  findNavbar,
  findPopper,
  findWrapper,
  findMessageStickyHeaderHeight,
  findPageWrapper,
} from "@/plugins/_core/dom-observers/thread/utils";
import { shouldEnableCoreObserver } from "@/plugins/_core/dom-observers/utils";
import { spaRouteChangeCompleteSubscribe } from "@/plugins/_core/spa-router/listeners";
import { csLoaderRegistry } from "@/utils/cs-loader-registry";
import { whereAmI } from "@/utils/utils";

csLoaderRegistry.register({
  id: "coreDomObserver:thread",
  dependencies: ["messaging:spaRouter"],
  loader: () => {
    if (
      !shouldEnableCoreObserver({
        coreObserverId: "coreDomObserver:thread",
      })
    )
      return;

    observeThread(whereAmI());

    spaRouteChangeCompleteSubscribe((url) => {
      observeThread(whereAmI(url));
    });
  },
});

function cleanup() {
  DomObserver.destroy(createDomObserverId("thread"));
  threadDomObserverStore.getState().resetStore();
}

function observeThread(location: ReturnType<typeof whereAmI>) {
  if (location !== "thread") return cleanup();

  DomObserver.create(createDomObserverId("thread"), {
    target: document.body,
    config: { childList: true, subtree: true },
    fireImmediately: true,
    onMutation: () => {
      CallbackQueue.getInstance().enqueueArray([
        {
          id: createTaskId("thread", "pageWrapper"),
          callback: findPageWrapper,
        },
        {
          id: createTaskId("thread", "wrapper"),
          callback: findWrapper,
        },
        {
          id: createTaskId("thread", "navbar"),
          callback: findNavbar,
        },
        {
          id: createTaskId("thread", "popper"),
          callback: findPopper,
        },
        {
          id: createTaskId("thread", "navbarOverflowMenuButton"),
          callback: findNavbarOverflowMenuButtonWrapper,
        },
        {
          id: createTaskId("thread", "messageStickyHeaderHeight"),
          callback: findMessageStickyHeaderHeight,
        },
      ]);
    },
  });
}
