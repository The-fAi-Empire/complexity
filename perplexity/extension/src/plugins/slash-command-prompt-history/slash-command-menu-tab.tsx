import { LuHistory } from "react-icons/lu";
import { lazily } from "react-lazily";

import KeyCombo from "@/components/KeyCombo";
import Tooltip from "@/components/Tooltip";
import { CommandItemSkeleton } from "@/components/ui/command";
import { TabContent, TabTrigger } from "@/components/ui/tabs";
import CsUiPluginsGuard from "@/plugins/_core/plugins-guard/CsUiPluginsGuard";
import { ExtensionSettingsService } from "@/services/extension-settings";

const { PromptHistory } = lazily(
  () => import("@/plugins/slash-command-prompt-history/PromptHistory"),
);

declare module "@/plugins/slash-command/store/slices/content-tab" {
  interface ContentTabRegistry {
    [tabId]: void;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const tabId = "promptHistory" as const;

export function SlashCommandMenuTabContent() {
  return (
    <CsUiPluginsGuard
      dependentPluginIds={[
        "queryBox:slashCommandMenu",
        "queryBox:slashCommandMenu:promptHistory",
      ]}
      suspenseFallback={
        <TabContent value={tabId} className="x:h-[200px]">
          <CommandItemSkeleton count={5} className="x:h-7" />
        </TabContent>
      }
    >
      <TabContent value={tabId}>
        <PromptHistory />
      </TabContent>
    </CsUiPluginsGuard>
  );
}

export function SlashCommandMenuTabTrigger() {
  const shortcut =
    ExtensionSettingsService.cachedSync.plugins[
      "queryBox:slashCommandMenu:promptHistory"
    ].shortcut;

  return (
    <CsUiPluginsGuard
      dependentPluginIds={[
        "queryBox:slashCommandMenu",
        "queryBox:slashCommandMenu:promptHistory",
      ]}
    >
      <Tooltip
        content={
          <div className="x:flex x:flex-col x:items-center x:justify-center x:gap-1">
            <div>Prompt History</div>
            <KeyCombo
              keys={
                shortcut.type === "keybinding"
                  ? shortcut.value
                  : ["//" + shortcut.value]
              }
              className="x:tracking-widest"
            />
          </div>
        }
        positioning={{
          placement: "right",
        }}
      >
        <TabTrigger value={tabId} className="x:rounded-none x:py-2">
          <LuHistory className="x:size-4" />
        </TabTrigger>
      </Tooltip>
    </CsUiPluginsGuard>
  );
}
