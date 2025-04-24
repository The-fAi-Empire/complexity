/* cli-ignore */

import type { ZodSchema } from "zod";

import { APP_CONFIG } from "@/app.config";
import { defineRemoteResource } from "@/services/cplx-api/remote-resources";
import {
  CplxVersionsSchema,
  type CplxVersions,
} from "@/services/cplx-api/types";

export const versionsRemoteResourceConfig = defineRemoteResource({
  resourcePath: "versions.json",
  type: "json",
  fallback: {
    latest: APP_CONFIG.VERSION,
    canvasInstructionLastUpdated: Date.now(),
    changelogEntries: [],
  },
  zodSchema: CplxVersionsSchema as ZodSchema<CplxVersions>,
});
