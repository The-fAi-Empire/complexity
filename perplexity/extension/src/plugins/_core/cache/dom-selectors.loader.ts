import { APP_CONFIG } from "@/app.config";
import { asyncLoaderRegistry } from "@/data/async-dep-registry";
import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { cplxApiQueries } from "@/services/cplx-api/query-keys";
import { errorWrapper } from "@/utils/error-wrapper";
import { queryClient } from "@/utils/ts-query-client";

declare module "@/data/async-dep-registry" {
  interface AsyncLoadersRegistry {
    "cache:domSelectors": void;
  }
}

export default async function loader() {
  asyncLoaderRegistry.register({
    id: "cache:domSelectors",
    dependencies: [],
    loader: async () => {
      if (APP_CONFIG.IS_DEV) return;

      const [data, error] = await errorWrapper(() =>
        queryClient.fetchQuery(cplxApiQueries.domSelectors),
      )();

      if (error) return;

      DomSelectorsRegistry.remote = data;
    },
  });
}
