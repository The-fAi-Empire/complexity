import type translations from "@/_locales/common.en-US";

export const namespace = "common";

declare module "@complexity/i18n" {
  interface TranslationsRegistry {
    [namespace]: typeof translations;
  }
}
