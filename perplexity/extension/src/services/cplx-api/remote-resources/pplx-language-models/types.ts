import { z } from "zod";

import type { pplxLocalLanguageModels } from "@/services/cplx-api/remote-resources/pplx-language-models/defaults";
import type {
  ExtractCode,
  FilterModelByType,
} from "@/services/cplx-api/remote-resources/pplx-language-models/utils.types";

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
  | (typeof pplxLocalLanguageModels)[number]["code"]
  | (string & {});

export type FastLanguageModelCode = ExtractCode<
  FilterModelByType<typeof pplxLocalLanguageModels, "fast">
>;
export type ReasoningLanguageModelCode = ExtractCode<
  FilterModelByType<typeof pplxLocalLanguageModels, "reasoning">
>;
export type DeepResearchLanguageModelCode = ExtractCode<
  FilterModelByType<typeof pplxLocalLanguageModels, "deepResearch">
>;
export type AutoLanguageModelCode = ExtractCode<
  FilterModelByType<typeof pplxLocalLanguageModels, "auto">
>;

export type LanguageModelProvider =
  | (typeof pplxLocalLanguageModels)[number]["provider"]
  | (string & {});
