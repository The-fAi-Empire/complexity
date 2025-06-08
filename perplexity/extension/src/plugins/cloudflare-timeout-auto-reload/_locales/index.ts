import type translations from "@/plugins/cloudflare-timeout-auto-reload/_locales/plugin-cloudflare-timeout-auto-reload.en-US";

export const namespace = "plugin-cloudflare-timeout-auto-reload";

declare module "@complexity/i18n" {
  interface TranslationsRegistry {
    [namespace]: typeof translations;
  }
}
