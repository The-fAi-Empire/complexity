import { queryClient } from "@/data/query-client";
import { asyncLoaderRegistry } from "@/plugins/_core/async-dep-registry";
import { spaRouteChangeCompleteSubscribe } from "@/plugins/_core/main-world/spa-router/listeners.loader";
import { sharedQueryBoxStore } from "@/plugins/_core/ui/groups/query-box/shared-store";
import { isLanguageModelCode } from "@/services/cplx-api/remote-resources/pplx-language-models/predicates";
import type { Space } from "@/services/pplx-api/pplx-api.types";
import { pplxApiQueries } from "@/services/pplx-api/query-keys";
import { parseUrl, whereAmI } from "@/utils/utils";

declare module "@/plugins/_core/async-dep-registry" {
  interface AsyncLoadersRegistry {
    "plugin:queryBox:languageModelSelector:respectSpaceModel": void;
  }
}

export default function loader() {
  asyncLoaderRegistry.register({
    id: "plugin:queryBox:languageModelSelector:respectSpaceModel",
    dependencies: ["cache:pluginsStates", "cache:extensionSettings"],
    loader: ({
      "cache:pluginsStates": pluginsStates,
      "cache:extensionSettings": extensionSettings,
    }) => {
      if (
        !pluginsStates["queryBox:languageModelSelector"] ||
        !extensionSettings.plugins["queryBox:languageModelSelector"]
          .respectDefaultSpaceModel
      )
        return;

      handler(window.location.href);

      spaRouteChangeCompleteSubscribe((url) => {
        handler(url);
      });
    },
  });
}

async function handler(url: string) {
  const location = whereAmI(url);

  if (location !== "collection") return;

  const spaceSlug = parseUrl(url).pathname.split("/").pop();

  if (spaceSlug == null) return;

  const spacesData =
    queryClient.getQueryData<Space[]>(pplxApiQueries.spaces.all()) ??
    (await queryClient.fetchQuery(pplxApiQueries.spaces.detail()));

  if (spacesData == null) return;

  const space = spacesData.find(
    (space) => space.slug === spaceSlug || space.uuid === spaceSlug,
  );

  if (
    space == null ||
    space.model_selection == null ||
    !isLanguageModelCode(space.model_selection)
  )
    return;

  sharedQueryBoxStore
    .getState()
    .setSelectedLanguageModel(space.model_selection);
}
