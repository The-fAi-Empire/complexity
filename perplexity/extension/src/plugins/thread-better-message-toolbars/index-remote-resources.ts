import { z } from "zod";

import hideUnnecessaryButtonsCss from "@/plugins/thread-better-message-toolbars/hide-unnecessary-buttons.css?inline";
import normalizeCss from "@/plugins/thread-better-message-toolbars/normalize.css?inline";
import stickyCss from "@/plugins/thread-better-message-toolbars/sticky.css?inline";
import { defineVersionedRemoteResource } from "@/services/cplx-api/versioned-remote-resources";

export const threadBetterMessageToolbarsNormalizeCssResourceConfig =
  defineVersionedRemoteResource({
    name: "plugin.threadBetterMessageToolbars.normalizeCss",
    type: "css",
    fallback: normalizeCss,
    zodSchema: z.string(),
  });

export const threadBetterMessageToolbarsHideUnnecessaryButtonsCssResourceConfig =
  defineVersionedRemoteResource({
    name: "plugin.threadBetterMessageToolbars.hideUnnecessaryButtonsCss",
    type: "css",
    fallback: hideUnnecessaryButtonsCss,
    zodSchema: z.string(),
  });

export const threadBetterMessageToolbarsStickyCssResourceConfig =
  defineVersionedRemoteResource({
    name: "plugin.threadBetterMessageToolbars.stickyCss",
    type: "css",
    fallback: stickyCss,
    zodSchema: z.string(),
  });
