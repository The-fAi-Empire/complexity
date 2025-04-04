import {
  CallbackQueue,
  createTaskId,
} from "@/plugins/_api/dom-observer/callback-queue";
import { DomObserver } from "@/plugins/_api/dom-observer/dom-observer";
import { createDomObserverId } from "@/plugins/_api/dom-observer/dom-observer.types";
import {
  findLibraryButtonTriggerButtonsWrapper,
  findLibraryButtonWrapper,
  findSidebarWrapper,
  findSpaceButtonTriggerButtonsWrapper,
  findSpaceButtonWrapper,
} from "@/plugins/_core/dom-observers/sidebar/utils";
import { shouldEnableCoreObserver } from "@/plugins/_core/dom-observers/utils";
import { csLoaderRegistry } from "@/utils/cs-loader-registry";

csLoaderRegistry.register({
  id: "coreDomObserver:sidebar",
  loader: () => {
    if (
      !shouldEnableCoreObserver({
        coreObserverId: "coreDomObserver:sidebar",
      })
    )
      return;

    observeSidebar();
  },
});

async function observeSidebar() {
  DomObserver.create(createDomObserverId("sidebar", "wrapper"), {
    target: document.body,
    config: { childList: true, subtree: true },
    onMutation: () =>
      CallbackQueue.getInstance().enqueueArray([
        {
          callback: findSidebarWrapper,
          id: createTaskId("sidebar", "wrapper"),
        },
        {
          callback: findSpaceButtonWrapper,
          id: createTaskId("sidebar", "spaceButtonWrapper"),
        },
        {
          callback: findSpaceButtonTriggerButtonsWrapper,
          id: createTaskId("sidebar", "spaceButtonTriggerButtonsWrapper"),
        },
        {
          callback: findLibraryButtonWrapper,
          id: createTaskId("sidebar", "libraryButtonWrapper"),
        },
        {
          callback: findLibraryButtonTriggerButtonsWrapper,
          id: createTaskId("sidebar", "libraryButtonTriggerButtonsWrapper"),
        },
      ]),
  });
}
