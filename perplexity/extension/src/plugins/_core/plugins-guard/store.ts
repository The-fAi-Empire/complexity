import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";

import type { whereAmI } from "@/utils/utils";

type PluginGuardsStoreType = {
  currentLocation: ReturnType<typeof whereAmI>;
  isMobile: boolean;
  isLoggedIn: boolean;
  isOrgMember: boolean;
  hasActiveSub: boolean;
};

export const pluginGuardsStore = createWithEqualityFn<PluginGuardsStoreType>()(
  subscribeWithSelector(
    immer(
      (): PluginGuardsStoreType => ({
        currentLocation: "unknown",
        isMobile: false,
        isLoggedIn: false,
        isOrgMember: false,
        hasActiveSub: false,
      }),
    ),
  ),
);

export const usePluginGuardsStore = pluginGuardsStore;
