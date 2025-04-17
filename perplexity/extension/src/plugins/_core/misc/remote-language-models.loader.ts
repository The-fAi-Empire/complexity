import { APP_CONFIG } from "@/app.config";
import { asyncLoaderRegistry } from "@/data/async-dep-registry";
import { PplxLanguageModel } from "@/data/plugins/query-box/language-model-selector/language-models";
import { cplxApiQueries } from "@/services/cplx-api/query-keys";
import { errorWrapper } from "@/utils/error-wrapper";
import { queryClient } from "@/utils/ts-query-client";

declare module "@/data/async-dep-registry" {
  interface AsyncLoadersRegistry {
    "cache:languageModels": void;
  }
}

export default function loader() {
  asyncLoaderRegistry.register({
    id: "cache:languageModels",
    dependencies: ["cache:pluginsStates"],
    loader: async ({ "cache:pluginsStates": pluginsStates }) => {
      if (APP_CONFIG.IS_DEV) return;

      if (!pluginsStates["queryBox:languageModelSelector"]) return undefined;

      const [data, error] = await errorWrapper(() =>
        queryClient.fetchQuery({
          ...cplxApiQueries.remoteLanguageModels,
          gcTime: Infinity,
        }),
      )();

      if (!error && data) {
        PplxLanguageModel.allModels = data;
        PplxLanguageModel.fastModels = data.filter(
          (model) => model.type === "fast",
        );
        PplxLanguageModel.reasoningModels = data.filter(
          (model) => model.type === "reasoning",
        );
        PplxLanguageModel.deepResearchModels = data.filter(
          (model) => model.type === "deepResearch",
        );
        PplxLanguageModel.autoModels = data.filter(
          (model) => model.type === "auto",
        );
      }
    },
  });
}
