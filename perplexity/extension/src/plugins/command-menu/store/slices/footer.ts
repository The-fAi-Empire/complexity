import type { BoundStateCreator } from "@/plugins/command-menu/store/types";

export type FooterItem = {
  title: string;
  keybinding?: string[];
  onSelect?: () => void;
};

export type FooterSlice = {
  footerItems: FooterItem[];
  setFooterItems: (items: FooterItem[]) => void;
};

export const createFooterSlice: BoundStateCreator<FooterSlice> = (set) => ({
  footerItems: [],
  setFooterItems: (items) => set({ footerItems: items }),
});
