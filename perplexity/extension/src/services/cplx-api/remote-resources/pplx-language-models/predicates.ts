import { PplxLanguageModelsService } from "@/services/cplx-api/remote-resources/pplx-language-models";
import type {
  AutoLanguageModelCode,
  DeepResearchLanguageModelCode,
  FastLanguageModelCode,
  LanguageModel,
  ReasoningLanguageModelCode,
} from "@/services/cplx-api/remote-resources/pplx-language-models/types";

export function isLanguageModelCode(
  value: string,
): value is LanguageModel["code"] {
  return PplxLanguageModelsService.allModels.some(
    (model) => model.code === value,
  );
}

export function isReasoningLanguageModelCode(
  value: string,
): value is ReasoningLanguageModelCode {
  return PplxLanguageModelsService.reasoningModels.some(
    (model) => model.code === value,
  );
}

export function isFastLanguageModelCode(
  value: string,
): value is FastLanguageModelCode {
  return PplxLanguageModelsService.fastModels.some(
    (model) => model.code === value,
  );
}

export function isDeepResearchLanguageModelCode(
  value: string,
): value is DeepResearchLanguageModelCode {
  return PplxLanguageModelsService.deepResearchModels.some(
    (model) => model.code === value,
  );
}

export function isAutoLanguageModelCode(
  value: string,
): value is AutoLanguageModelCode {
  return PplxLanguageModelsService.autoModels.some(
    (model) => model.code === value,
  );
}
