import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Vypršení relace",
    sessionTimeoutDescription:
      "Vaše relace vypršela (pravděpodobně kvůli Cloudflare)",
    reload: "Znovu načíst",
    dismiss: "Zavřít",
  },
} as const satisfies LanguageMessages;
