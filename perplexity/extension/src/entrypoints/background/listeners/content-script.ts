import { onMessage } from "webext-bridge/background";

import { APP_CONFIG } from "@/app.config";
import { getOptionsPageUrl } from "@/utils/utils";

declare module "@/types/webext-bridge-overrides" {
  interface EventHandlers {
    "bg:getTabId": () => number;
    "bg:comet:getSidecarTabId": () => number | undefined;
    "bg:openDirectReleaseNotes": ({ version }: { version: string }) => void;
    "bg:openOptionsPage": () => void;
    "bg:notify": ({ data }: { data: any }) => boolean;
  }
}

export function contentScriptListeners() {
  onMessage("bg:getTabId", ({ sender }) => sender.tabId);

  onMessage("bg:comet:getSidecarTabId", async ({ sender }) => {
    const tabId = sender.tabId;

    if (!tabId) return;

    const windowId = (await chrome.tabs.get(tabId)).windowId;

    if (windowId == null) return;

    const window = await chrome.windows.get(windowId);

    if (window == null) return;

    return (window as any).sidecarTabId as number | undefined;
  });

  onMessage("bg:openOptionsPage", () => {
    chrome.runtime.openOptionsPage();
  });

  onMessage("bg:openDirectReleaseNotes", ({ data: { version } }) => {
    const optionsPageUrl = getOptionsPageUrl({ isDev: APP_CONFIG.IS_DEV });

    chrome.tabs.create({
      url: `${optionsPageUrl}#/direct-release-notes?version=${version}`,
    });
  });
}
