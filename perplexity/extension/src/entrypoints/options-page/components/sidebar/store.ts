import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";

import {
  defaultNavItems,
  type NavItem,
} from "@/entrypoints/options-page/components/sidebar/nav-items";

type OptionsPageSidebarStoreType = {
  navItems: NavItem[];
};

export const optionsPageSidebarStore =
  createWithEqualityFn<OptionsPageSidebarStoreType>()(
    subscribeWithSelector(
      immer((): OptionsPageSidebarStoreType => ({ navItems: defaultNavItems })),
    ),
  );

export const useOptionsPageSidebarStore = optionsPageSidebarStore;
