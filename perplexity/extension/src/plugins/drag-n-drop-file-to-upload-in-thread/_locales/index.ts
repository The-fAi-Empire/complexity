import type translations from "@/plugins/drag-n-drop-file-to-upload-in-thread/_locales/plugin-drag-n-drop-file-to-upload-in-thread.en-US";

export const namespace = "plugin-drag-n-drop-file-to-upload-in-thread";

declare module "@complexity/i18n" {
  interface TranslationsRegistry {
    [namespace]: typeof translations;
  }
}
