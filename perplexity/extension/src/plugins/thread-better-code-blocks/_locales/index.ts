import type translations from "@/plugins/thread-better-code-blocks/_locales/plugin-better-code-blocks.en-US";

export const namespace = "plugin-better-code-blocks";

declare module "@complexity/i18n" {
  interface TranslationsRegistry {
    [namespace]: typeof translations;
  }
}
