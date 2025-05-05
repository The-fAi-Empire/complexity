import type { Space } from "@/services/pplx-api/pplx-api.types";

export interface CommandMenuPagesArgsRegistry {
  spaces: undefined;
  threads: undefined;
  spaceThreads: {
    spaceSlug: Space["slug"];
  };
}

export type CommandMenuPageId = keyof CommandMenuPagesArgsRegistry;

export type PageStack<PageId extends CommandMenuPageId> = {
  pageId: PageId;
  searchPlaceholder: string;
  sidecarOpen: boolean;
  shouldLocalFilter: boolean;
  args: CommandMenuPagesArgsRegistry[PageId];
};
