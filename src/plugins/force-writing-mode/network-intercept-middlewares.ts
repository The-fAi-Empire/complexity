import { produce } from "immer";

import { networkInterceptMiddlewareManager } from "@/plugins/_api/network-intercept-middleware-manager/middleware-manager";
import {
  encodePerplexityAskEvent,
  parsePerplexityAskEvent,
} from "@/plugins/_core/network-intercept/utils/parse-perplexity-ask-event";
import { sharedQueryBoxStore } from "@/plugins/_core/ui-groups/query-box/shared-store";
import { PluginsStatesService } from "@/services/plugins-states";
import { csLoaderRegistry } from "@/utils/cs-loader-registry";

csLoaderRegistry.register({
  id: "plugin:queryBox:spacesThreadsForceWritingMode",
  dependencies: ["cache:pluginsStates", "cache:extensionLocalStorage"],
  loader: () => {
    const pluginsEnableStates =
      PluginsStatesService.getEnableStatesCachedSync();

    if (!pluginsEnableStates["queryBox:spacesThreadsForceWritingMode"]) return;

    networkInterceptMiddlewareManager.updateMiddleware({
      id: "spaces-threads-force-writing-mode",
      middlewareFn({ data, skip }) {
        const enable =
          sharedQueryBoxStore.getState().spacesThreadsForceWritingMode;

        if (!enable) return skip();

        const isWSSend =
          data.type === "network-intercept:webSocketEvent" &&
          data.event === "send";
        const isSSESend =
          data.type === "network-intercept:fetchEvent" &&
          data.event === "request";

        if (!isWSSend && !isSSESend) {
          return skip();
        }

        const parsedData = parsePerplexityAskEvent({
          rawData: data.payload.data,
          url: data.payload.url,
        });

        if (parsedData == null) return skip();

        const isCollectionThread =
          parsedData.params.query_source == "collection";

        if (!isCollectionThread) return skip();

        const newParams = produce(parsedData.params, (draft: any) => {
          draft.sources = [];
          draft.search_focus = "writing";
        });

        const newEncodedPayload = encodePerplexityAskEvent({
          newPayload: {
            ...parsedData,
            params: newParams,
          },
          url: data.payload.url,
        });

        return newEncodedPayload;
      },
    });
  },
});
