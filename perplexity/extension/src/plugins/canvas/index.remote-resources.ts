import { z } from "zod";

import canvasCss from "@/plugins/canvas/canvas.css?inline";
import { defineVersionedRemoteResource } from "@/services/cplx-api/versioned-remote-resources";

export const canvasCssResourceConfig = defineVersionedRemoteResource({
  name: "plugin.canvas.canvasCss",
  type: "css",
  fallback: canvasCss,
  zodSchema: z.string(),
});
