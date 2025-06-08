import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Časový limit relácie",
    sessionTimeoutDescription:
      "Vaša relácia vypršala (pravdepodobne kvôli Cloudflare)",
    reload: "Znovu načítať",
    dismiss: "Zavrieť",
  },
} as const satisfies LanguageMessages;
