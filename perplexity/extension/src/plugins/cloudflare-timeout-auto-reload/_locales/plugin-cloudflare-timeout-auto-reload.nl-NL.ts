import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Sessie verlopen",
    sessionTimeoutDescription:
      "Uw sessie is verlopen (waarschijnlijk vanwege Cloudflare)",
    reload: "Herladen",
    dismiss: "Sluiten",
  },
} as const satisfies LanguageMessages;
