import { asyncLoaderRegistry } from "@/plugins/_core/async-dep-registry";
import { PplxLanguageModelsService } from "@/services/cplx-api/remote-resources/pplx-language-models";
import type { LanguageModel } from "@/services/cplx-api/remote-resources/pplx-language-models/types";

declare module "@/plugins/_core/async-dep-registry" {
  interface AsyncLoadersRegistry {
    "cache:languageModels": LanguageModel[];
  }
}

export default function loader() {
  asyncLoaderRegistry.register({
    id: "cache:languageModels",
    dependencies: ["cache:pluginsStates"],
    loader: async ({ "cache:pluginsStates": pluginsStates }) => {
      const localModels =
        PplxLanguageModelsService.localModels as unknown as LanguageModel[];

      if (!pluginsStates["queryBox:languageModelSelector"]) return localModels;

      const data = await PplxLanguageModelsService.inlineQueryFn();

      PplxLanguageModelsService.allModels = data;
      PplxLanguageModelsService.fastModels = data.filter(
        (model) => model.type === "fast",
      );
      PplxLanguageModelsService.reasoningModels = data.filter(
        (model) => model.type === "reasoning",
      );
      PplxLanguageModelsService.deepResearchModels = data.filter(
        (model) => model.type === "deepResearch",
      );
      PplxLanguageModelsService.autoModels = data.filter(
        (model) => model.type === "auto",
      );

      return data;
    },
  });
}
