import {
  CallbackQueue,
  createTaskId,
} from "@/plugins/_api/dom-observer/callback-queue";
import { DomObserver } from "@/plugins/_api/dom-observer/dom-observer";
import { createDomObserverId } from "@/plugins/_api/dom-observer/dom-observer.types";
import {
  findBottomBar,
  findSlogan,
  observeLanguageSelector,
} from "@/plugins/_core/dom-observers/home/utils";
import { shouldEnableCoreObserver } from "@/plugins/_core/dom-observers/utils";
import { spaRouteChangeCompleteSubscribe } from "@/plugins/_core/spa-router/listeners";
import { csLoaderRegistry } from "@/utils/cs-loader-registry";
import { DOM_SELECTORS } from "@/utils/dom-selectors";
import { whereAmI } from "@/utils/utils";

csLoaderRegistry.register({
  id: "coreDomObserver:home",
  dependencies: ["messaging:spaRouter"],
  loader: () => {
    // this observer is always needed for update announcer

    // if (
    //   !shouldEnableCoreObserver({
    //     coreObserverId: "coreDomObserver:home",
    //   })
    // )
    //   return;

    observeHome(whereAmI());

    spaRouteChangeCompleteSubscribe((url) => {
      observeHome(whereAmI(url));
    });
  },
});

const cleanup = () => {
  DomObserver.destroy(createDomObserverId("home"));
  DomObserver.destroy(createDomObserverId("home", "languageSelector"));
};

function observeHome(location: ReturnType<typeof whereAmI>) {
  cleanup();

  if (location !== "home") return;

  DomObserver.create(createDomObserverId("home"), {
    target: document.body,
    config: { childList: true, subtree: true },
    onMutation: () =>
      CallbackQueue.getInstance().enqueueArray([
        { callback: findSlogan, id: createTaskId("home", "slogan") },
        {
          callback: findBottomBar,
          id: createTaskId("home", "bottomBar"),
        },
      ]),
  });

  const $languageSelector = $(DOM_SELECTORS.HOME.LANGUAGE_SELECTOR);

  if (!$languageSelector[0]) return;

  DomObserver.create(createDomObserverId("home", "languageSelector"), {
    target: $languageSelector[0],
    config: { attributes: true, attributeFilter: ["aria-label"] },
    onMutation: () =>
      CallbackQueue.getInstance().enqueue(
        observeLanguageSelector,
        createTaskId("home", "languageSelector"),
      ),
  });
}
