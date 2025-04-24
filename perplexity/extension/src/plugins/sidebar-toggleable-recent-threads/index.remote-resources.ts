import { z } from "zod";

import sidebarToggleableRecentThreadsCss from "@/plugins/sidebar-toggleable-recent-threads/styles.css?inline";
import { defineVersionedRemoteResource } from "@/services/cplx-api/versioned-remote-resources";

export const sidebarToggleableRecentThreadsCssResourceConfig =
  defineVersionedRemoteResource({
    name: "plugin.sidebarToggleableRecentThreads.css",
    type: "css",
    fallback: sidebarToggleableRecentThreadsCss,
    zodSchema: z.string(),
  });
