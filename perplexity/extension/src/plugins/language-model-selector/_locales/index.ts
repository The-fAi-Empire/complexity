import type translations from "@/plugins/language-model-selector/_locales/plugin-model-selectors.en-US";

export const namespace = "plugin-model-selectors";

declare module "@complexity/i18n" {
  interface TranslationsRegistry {
    [namespace]: typeof translations;
  }
}
