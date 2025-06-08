import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Sesiune expirată",
    sessionTimeoutDescription:
      "Sesiunea dvs. a expirat (cel mai probabil din cauza Cloudflare)",
    reload: "Reîncarcă",
    dismiss: "Închide",
  },
} as const satisfies LanguageMessages;
