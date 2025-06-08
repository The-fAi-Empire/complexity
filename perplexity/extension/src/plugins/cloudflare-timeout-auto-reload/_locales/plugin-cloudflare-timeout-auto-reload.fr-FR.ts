import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Expiration de session",
    sessionTimeoutDescription:
      "Votre session a expiré (probablement à cause de Cloudflare)",
    reload: "Recharger",
    dismiss: "Fermer",
  },
} as const satisfies LanguageMessages;
