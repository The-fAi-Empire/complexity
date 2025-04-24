import { z } from "zod";

import { defineRemoteResource } from "@/services/cplx-api/remote-resources";
import { pplxLocalLanguageModels } from "@/services/cplx-api/remote-resources/pplx-language-models/defaults";
import {
  LanguageModelSchema,
  type LanguageModel,
} from "@/services/cplx-api/remote-resources/pplx-language-models/types";

export const pplxLanguageModelsResourceConfig = defineRemoteResource({
  resourcePath: "language-models.json",
  type: "json",
  fallback: pplxLocalLanguageModels as unknown as LanguageModel[],
  zodSchema: z.array(LanguageModelSchema),
});
