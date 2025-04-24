// ⚠️⚠️⚠️ This service is used in both main world and extension's context
// ⚠️⚠️⚠️ Keep this service clean from any extension-only lib

import {
  DOM_SELECTORS,
  INTERNAL_ATTRIBUTES,
  TEST_ID,
} from "@/services/cplx-api/versioned-remote-resources/dom-selectors/defaults";
import { type DomSelectors } from "@/services/cplx-api/versioned-remote-resources/dom-selectors/types";

export class DomSelectorsService {
  static local: DomSelectors = DOM_SELECTORS;

  static remote: DomSelectors | null = null;

  static internalAttributes = INTERNAL_ATTRIBUTES;

  static testIds = TEST_ID;

  static get cachedSync() {
    return DomSelectorsService.remote ?? DomSelectorsService.local;
  }
}

(async () => {
  if (globalThis.window == null || globalThis.chrome?.runtime != null)
    return null;

  const sendMessage = (await import("webext-bridge/window")).sendMessage;

  const remoteDomSelectors = await sendMessage(
    "cache:domSelectors",
    undefined,
    "content-script",
  );

  DomSelectorsService.remote = remoteDomSelectors;
})();
