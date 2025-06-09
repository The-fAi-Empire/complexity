import type translations from "@/plugins/prompt-history/_locales/plugin-prompt-history.en-US";

export const namespace = "plugin-prompt-history";

declare module "@complexity/i18n" {
  interface TranslationsRegistry {
    [namespace]: typeof translations;
  }
}
