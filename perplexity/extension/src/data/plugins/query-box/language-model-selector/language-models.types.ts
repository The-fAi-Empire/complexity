import { z } from "zod";

import { PplxLanguageModel } from "@/data/plugins/query-box/language-model-selector/language-models";
import type {
  ExtractCode,
  FilterModelByType,
} from "@/data/plugins/query-box/language-model-selector/utils.types";

export const LanguageModelSchema = z.object({
  label: z.string(),
  shortLabel: z.string(),
  code: z.string() as z.ZodType<LanguageModelCode>,
  provider: z.string() as z.ZodType<LanguageModelProvider>,
  type: z.enum(["auto", "fast", "reasoning", "deepResearch"]),
  limitKey: z.string().optional(),
  description: z.string().optional(),
  hideFromList: z.boolean().optional(),
});

export type LanguageModel = z.infer<typeof LanguageModelSchema>;

export type LanguageModelCode =
  | (typeof PplxLanguageModel.localModels)[number]["code"]
  | (string & {});

export type FastLanguageModelCode = ExtractCode<
  FilterModelByType<typeof PplxLanguageModel.localModels, "fast">
>;
export type ReasoningLanguageModelCode = ExtractCode<
  FilterModelByType<typeof PplxLanguageModel.localModels, "reasoning">
>;
export type DeepResearchLanguageModelCode = ExtractCode<
  FilterModelByType<typeof PplxLanguageModel.localModels, "deepResearch">
>;
export type AutoLanguageModelCode = ExtractCode<
  FilterModelByType<typeof PplxLanguageModel.localModels, "auto">
>;

export type LanguageModelProvider =
  | (typeof PplxLanguageModel.localModels)[number]["provider"]
  | (string & {});

export function isLanguageModelCode(
  value: string,
): value is LanguageModel["code"] {
  return PplxLanguageModel.allModels.some((model) => model.code === value);
}

export function isReasoningLanguageModelCode(
  value: string,
): value is ReasoningLanguageModelCode {
  return PplxLanguageModel.reasoningModels.some(
    (model) => model.code === value,
  );
}

export function isFastLanguageModelCode(
  value: string,
): value is FastLanguageModelCode {
  return PplxLanguageModel.fastModels.some((model) => model.code === value);
}

export function isDeepResearchLanguageModelCode(
  value: string,
): value is DeepResearchLanguageModelCode {
  return PplxLanguageModel.deepResearchModels.some(
    (model) => model.code === value,
  );
}

export function isAutoLanguageModelCode(
  value: string,
): value is AutoLanguageModelCode {
  return PplxLanguageModel.autoModels.some((model) => model.code === value);
}
