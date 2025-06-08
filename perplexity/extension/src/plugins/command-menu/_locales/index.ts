import type translations from "@/plugins/command-menu/_locales/plugin-command-menu.en-US";

export const namespace = "plugin-command-menu";

declare module "@complexity/i18n" {
  interface TranslationsRegistry {
    [namespace]: typeof translations;
  }
}
