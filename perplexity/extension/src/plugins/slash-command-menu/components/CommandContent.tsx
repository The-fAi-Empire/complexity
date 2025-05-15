import { PopoverContent } from "@/components/ui/popover";
import { Tabs, TabsList } from "@/components/ui/tabs";
import {
  SlashCommandMenuTabContent as PromptHistorySlashCommandMenuTabContent,
  SlashCommandMenuTabTrigger as PromptHistorySlashCommandMenuTabTrigger,
} from "@/plugins/prompt-history/index.public";
import { useBlurHandler } from "@/plugins/slash-command-menu/hooks/useBlurHandler";
import {
  slashCommandMenuStore,
  useSlashCommandMenuStore,
} from "@/plugins/slash-command-menu/store";
import type { ContentTabId } from "@/plugins/slash-command-menu/store/slices/content-tab";
import { PPLX_SCROLLBAR_CLASSES } from "@/utils/pplx-scrollbar-classes";

export default function CommandContent() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useBlurHandler({
    contentRef,
    exceptionalElementSelectors: ["[data-prompt-history-clear-all-dialog]"],
  });

  const activeContentTab = useSlashCommandMenuStore(
    (store) => store.activeContentTab,
  );

  return (
    <PopoverContent
      ref={contentRef}
      data-slash-command-menu-content
      className={cn(
        PPLX_SCROLLBAR_CLASSES,
        "x:w-(--reference-width) x:overflow-x-hidden x:border-border/80 x:bg-secondary x:p-0 x:shadow-lg x:rounded-2xl",
      )}
      onKeyDown={(e) => {
        if (e.key === Key.Escape) {
          slashCommandMenuStore.getState().setOpen(false);
        }
      }}
    >
      <Tabs
        orientation="vertical"
        className="x:flex x:flex-row"
        value={activeContentTab}
        onValueChange={({ value }) => {
          slashCommandMenuStore
            .getState()
            .setActiveContentTab(value as ContentTabId);
        }}
      >
        <div className="x:max-h-[calc(var(--available-height)-50px)] x:w-full x:*:h-full">
          <PromptHistorySlashCommandMenuTabContent />
        </div>
        <TabsList
          className={cn(
            PPLX_SCROLLBAR_CLASSES,
            "x:flex-col x:justify-start x:overflow-x-hidden x:overflow-y-auto x:rounded-none x:border-l x:bg-background x:p-0 x:transition-all x:empty:hidden",
          )}
        >
          <PromptHistorySlashCommandMenuTabTrigger />
        </TabsList>
      </Tabs>
    </PopoverContent>
  );
}
