import type translations from "@/plugins/thread-better-message-copy-buttons/_locales/plugin-better-copy-buttons.en-US";

export const namespace = "plugin-better-copy-buttons";

declare module "@complexity/i18n" {
  interface TranslationsRegistry {
    [namespace]: typeof translations;
  }
}
