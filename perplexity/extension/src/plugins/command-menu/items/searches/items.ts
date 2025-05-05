import PplxSpace from "@/components/icons/PplxSpace";
import PplxThread from "@/components/icons/PplxThread";
import { commandMenuStore } from "@/plugins/command-menu/store";
import type { CommandItemProps } from "@/plugins/command-menu/types";
import { ExtensionSettingsService } from "@/services/extension-settings";

export const getRawItems = (): CommandItemProps[] => [
  {
    eager: true,
    group: t("plugin-command-menu:commandMenu.groups.search"),
    icon: PplxThread,
    keybinding:
      ExtensionSettingsService.cachedSync.plugins.commandMenu.keybindings
        .threadsSearch,
    keywords: ["search"],
    onSelect: () => {
      commandMenuStore.getState().pushPage({
        pageId: "threads",
        searchPlaceholder: t(
          "plugin-command-menu:commandMenu.search.threadsPlaceholder",
        ),
        shouldLocalFilter: false,
        sidecarOpen: false,
        args: undefined,
      });
    },
    priority: 0,
    show: true,
    title: t("plugin-command-menu:commandMenu.search.threads"),
    value: "search-threads",
  },
  {
    eager: true,
    group: t("plugin-command-menu:commandMenu.groups.search"),
    icon: PplxSpace,
    keybinding:
      ExtensionSettingsService.cachedSync.plugins.commandMenu.keybindings
        .spacesSearch,
    keywords: ["search"],
    onSelect: () => {
      commandMenuStore.getState().pushPage({
        pageId: "spaces",
        searchPlaceholder: t(
          "plugin-command-menu:commandMenu.search.spacesPlaceholder",
        ),
        shouldLocalFilter: true,
        sidecarOpen: false,
        args: undefined,
      });
    },
    priority: 0,
    show: true,
    title: t("plugin-command-menu:commandMenu.search.spaces"),
    value: "search-spaces",
  },
];
