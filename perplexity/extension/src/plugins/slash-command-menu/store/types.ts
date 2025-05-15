import type { StateCreator } from "zustand/vanilla";

import type { slashCommandMenuStore } from "@/plugins/slash-command-menu/store";
import type { AnchorSlice } from "@/plugins/slash-command-menu/store/slices/anchor";
import type { ContentTabSlice } from "@/plugins/slash-command-menu/store/slices/content-tab";
import type { StatesSlice } from "@/plugins/slash-command-menu/store/slices/states";

export type SlashCommandMenuStore = typeof slashCommandMenuStore;

export type SlashCommandMenuStoreType = StatesSlice &
  AnchorSlice &
  ContentTabSlice;

export type BoundStateCreator<T> = StateCreator<
  SlashCommandMenuStoreType,
  [["zustand/subscribeWithSelector", never], ["zustand/immer", never]],
  [],
  T
>;
