import type { BoundStateCreator } from "@/plugins/slash-command-menu/store/types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContentTabRegistry {}

export type ContentTabId = keyof ContentTabRegistry;

export type ContentTabSlice = {
  activeContentTab: ContentTabId | null;
  setActiveContentTab: (tab: ContentTabId) => void;
  contentTabCommandShortcuts: Partial<Record<ContentTabId, string>>;
  registerContentTabCommandShortcut: ({
    tab,
    commandShortcuts,
  }: {
    tab: ContentTabId;
    commandShortcuts: string;
  }) => void;
};

export const createContentTabSlice: BoundStateCreator<ContentTabSlice> = (
  set,
  get,
) => ({
  activeContentTab: null,
  setActiveContentTab: (tab) => set({ activeContentTab: tab }),
  contentTabCommandShortcuts: {},
  registerContentTabCommandShortcut: ({
    tab,
    commandShortcuts,
  }: {
    tab: ContentTabId;
    commandShortcuts: string;
  }) =>
    set({
      contentTabCommandShortcuts: {
        ...(get().contentTabCommandShortcuts ?? {}),
        [tab]: commandShortcuts,
      },
    }),
});
