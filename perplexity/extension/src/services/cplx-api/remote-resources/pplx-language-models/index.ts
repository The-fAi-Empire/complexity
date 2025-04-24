import { cplxApiQueries } from "@/services/cplx-api/query-keys";
import { pplxLocalLanguageModels } from "@/services/cplx-api/remote-resources/pplx-language-models/defaults";
import { languageModelProviderIcons } from "@/services/cplx-api/remote-resources/pplx-language-models/icons";
import { pplxLanguageModelsResourceConfig } from "@/services/cplx-api/remote-resources/pplx-language-models/index.remote-resources";
import { type LanguageModel } from "@/services/cplx-api/remote-resources/pplx-language-models/types";
import { getRemoteResource } from "@/services/cplx-api/remote-resources/utils";

export class PplxLanguageModelsService {
  static get query() {
    return cplxApiQueries.remoteResource.detail({
      resourcePath: pplxLanguageModelsResourceConfig.resourcePath,
      zodSchema: pplxLanguageModelsResourceConfig.zodSchema,
    });
  }

  static inlineQueryFn() {
    return getRemoteResource(pplxLanguageModelsResourceConfig);
  }

  static localModels = pplxLocalLanguageModels;

  static allModels: LanguageModel[] = [
    ...PplxLanguageModelsService.localModels,
  ];

  static fastModels: LanguageModel[] = (() => {
    return PplxLanguageModelsService.allModels.filter(
      (model) => !model.hideFromList && model.type === "fast",
    );
  })();

  static reasoningModels: LanguageModel[] = (() => {
    return PplxLanguageModelsService.allModels.filter(
      (model) => !model.hideFromList && model.type === "reasoning",
    );
  })();

  static deepResearchModels: LanguageModel[] = (() => {
    return PplxLanguageModelsService.allModels.filter(
      (model) => !model.hideFromList && model.type === "deepResearch",
    );
  })();

  static autoModels: LanguageModel[] = (() => {
    return PplxLanguageModelsService.allModels.filter(
      (model) => !model.hideFromList && model.type === "auto",
    );
  })();

  static icons = languageModelProviderIcons;
}
