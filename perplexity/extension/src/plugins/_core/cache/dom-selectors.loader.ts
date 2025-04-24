import { onMessage } from "webext-bridge/content-script";

import { asyncLoaderRegistry } from "@/plugins/_core/async-dep-registry";
import { applyRouteIdAttribute } from "@/plugins/_core/main-world/spa-router/utils";
import { DomSelectorsService } from "@/services/cplx-api/versioned-remote-resources/dom-selectors";
import { domSelectorsResourceConfig } from "@/services/cplx-api/versioned-remote-resources/dom-selectors/index.remote-resources";
import type { DomSelectors } from "@/services/cplx-api/versioned-remote-resources/dom-selectors/types";
import { getVersionedRemoteResource } from "@/services/cplx-api/versioned-remote-resources/utils";
import { whereAmI } from "@/utils/utils";

declare module "@/plugins/_core/async-dep-registry" {
  interface AsyncLoadersRegistry {
    "cache:domSelectors": DomSelectors;
  }
}

declare module "@/types/webext-bridge-overrides" {
  interface EventHandlers {
    "cache:domSelectors": () => DomSelectors;
  }
}

export default async function loader() {
  asyncLoaderRegistry.register({
    id: "cache:domSelectors",
    dependencies: [],
    loader: async () => {
      applyRouteIdAttribute(whereAmI());

      const data = await getVersionedRemoteResource(domSelectorsResourceConfig);

      DomSelectorsService.remote = data;

      return data;
    },
  });

  onMessage("cache:domSelectors", () => {
    return DomSelectorsService.remote ?? DomSelectorsService.local;
  });
}
