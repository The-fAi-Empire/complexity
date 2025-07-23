import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";
import type { DomSelectors } from "@/services/cplx-api/versioned-remote-resources/dom-selectors/types";
import type { MaybePromise } from "@/types/utils.types";
import { UiUtils } from "@/utils/ui-utils";
import type { whereAmI } from "@/utils/utils";

export const locationWaits: Partial<
  Record<ReturnType<typeof whereAmI>, () => MaybePromise<boolean>>
> = (() => {
  let domSelectorsPromise: Promise<DomSelectors> | null = null;
  function getDomSelectors() {
    if (!domSelectorsPromise) {
      domSelectorsPromise = DomSelectorsService.mainWorldCached();
    }
    return domSelectorsPromise;
  }

  async function checkThreadLoaded() {
    const domSelectors = await getDomSelectors();
    await UiUtils.waitForSpaIdle();
    return $(domSelectors.THREAD.MESSAGE.INNER_WRAPPER).length > 0;
  }

  async function checkHomeLoaded() {
    const domSelectors = await getDomSelectors();
    if (new URL(window.location.href).pathname.includes("/b/home"))
      return $(domSelectors.HOME.COMET_HOME_MAIN_WRAPPER).length > 0;

    return $(domSelectors.HOME.SLOGAN).length > 0;
  }

  return {
    thread: checkThreadLoaded,
    home: checkHomeLoaded,
  };
})();
