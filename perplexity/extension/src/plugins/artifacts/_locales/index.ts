import type translations from "@/plugins/artifacts/_locales/plugin-artifacts.en-US";

export const namespace = "plugin-artifacts";

declare module "@complexity/i18n" {
  interface TranslationsRegistry {
    [namespace]: typeof translations;
  }
}
