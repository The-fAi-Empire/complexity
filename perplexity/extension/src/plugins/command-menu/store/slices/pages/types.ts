// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CommandMenuPagesArgsRegistry {}

export type CommandMenuPageId = keyof CommandMenuPagesArgsRegistry;

export type PageStack<PageId extends CommandMenuPageId = CommandMenuPageId> = {
  [K in PageId]: {
    pageId: K;
    searchPlaceholder: string;
    sidecarOpen: boolean;
    shouldLocalFilter: boolean;
    args: CommandMenuPagesArgsRegistry[K];
  };
}[PageId];
