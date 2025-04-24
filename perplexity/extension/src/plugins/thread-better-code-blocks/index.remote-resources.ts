import { z } from "zod";

import hideNativeCodeBlocksCss from "@/plugins/thread-better-code-blocks/hide-native-code-blocks.css?inline";
import { defineVersionedRemoteResource } from "@/services/cplx-api/versioned-remote-resources";

export const hideNativeCodeBlocksCssResourceConfig =
  defineVersionedRemoteResource({
    name: "plugin.threadBetterCodeBlocks.hideNativeCodeBlocksCss",
    type: "css",
    fallback: hideNativeCodeBlocksCss,
    zodSchema: z.string(),
  });
