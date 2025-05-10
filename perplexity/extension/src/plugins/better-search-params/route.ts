import type { RouteObject } from "react-router-dom";

import { softNavigate } from "@/plugins/_core/main-world/spa-router/utils";
import {
  parseQuery,
  setupTempInterceptor,
} from "@/plugins/better-search-params/utils";
import { PluginsStatesService } from "@/services/plugins-states";
import { waitUtil } from "@/utils/utils";

export const betterSearchParamsRouterRoute: RouteObject = {
  path: "",
  loader: async ({ request }) => {
    if (!PluginsStatesService.cachedEnableStates?.betterSearchParams)
      return null;

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const parsedQuery = parseQuery(searchParams);

    if (parsedQuery == null) return null;

    const { query, model, focusModes, isIncognito } = parsedQuery;

    if (query == null) return null;

    const cleanup = setupTempInterceptor({ model, focusModes, isIncognito });

    await waitUtil({
      condition: async () => {
        const url = new URL(`/search/`, window.location.href);

        url.searchParams.set("q", query);

        softNavigate(url.toString());

        return true;
      },
      timeout: 10000,
      interval: 500,
    });

    setTimeout(() => {
      cleanup?.();
    }, 1000);

    return null;
  },
  element: null,
};
