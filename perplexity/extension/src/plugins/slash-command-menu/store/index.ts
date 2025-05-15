import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";

import { createAnchorSlice } from "@/plugins/slash-command-menu/store/slices/anchor";
import { createContentTabSlice } from "@/plugins/slash-command-menu/store/slices/content-tab";
import { createStatesSlice } from "@/plugins/slash-command-menu/store/slices/states";
import { statesSubscriptions } from "@/plugins/slash-command-menu/store/slices/states/subs";
import type { SlashCommandMenuStoreType } from "@/plugins/slash-command-menu/store/types";

export const slashCommandMenuStore =
  createWithEqualityFn<SlashCommandMenuStoreType>()(
    subscribeWithSelector(
      immer(
        (set, get, ...props): SlashCommandMenuStoreType => ({
          ...createStatesSlice(set, get, ...props),
          ...createAnchorSlice(set, get, ...props),
          ...createContentTabSlice(set, get, ...props),
        }),
      ),
    ),
  );

export const useSlashCommandMenuStore = slashCommandMenuStore;

(() => {
  statesSubscriptions(slashCommandMenuStore);
})();
