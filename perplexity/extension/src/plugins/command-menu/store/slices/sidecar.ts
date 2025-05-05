import type { BoundStateCreator } from "@/plugins/command-menu/store/types";

export type SidecarSlice = {
  sidecarOpen: boolean;
  setSidecarOpen: (open: boolean) => void;
  sidecarItems: React.ReactNode | null;
  setSidecarItems: (items: React.ReactNode | null) => void;
};

export const createSidecarSlice: BoundStateCreator<SidecarSlice> = (set) => ({
  sidecarOpen: false,
  setSidecarOpen: (open) => set({ sidecarOpen: open }),
  sidecarItems: null,
  setSidecarItems: (items) => set({ sidecarItems: items }),
});
