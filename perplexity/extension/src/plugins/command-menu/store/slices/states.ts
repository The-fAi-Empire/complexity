import type { BoundStateCreator } from "@/plugins/command-menu/store/types";

export type StatesSlice = {
  open: boolean;
  setOpen: (value: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  selectingValue: string;
  setSelectingValue: (value: string) => void;
  shouldLocalFilter: boolean;
  setShouldLocalFilter: (value: boolean) => void;
};

export const createStatesSlice: BoundStateCreator<StatesSlice> = (set) => ({
  open: false,
  setOpen: (value) => set({ open: value }),
  searchValue: "",
  setSearchValue: (value) => set({ searchValue: value }),
  selectingValue: "",
  setSelectingValue: (value) => set({ selectingValue: value }),
  shouldLocalFilter: true,
  setShouldLocalFilter: (value) => set({ shouldLocalFilter: value }),
});
