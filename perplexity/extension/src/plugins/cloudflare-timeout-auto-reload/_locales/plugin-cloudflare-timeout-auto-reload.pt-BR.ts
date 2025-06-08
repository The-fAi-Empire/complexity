import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Tempo limite da sessão",
    sessionTimeoutDescription:
      "Sua sessão expirou (provavelmente devido ao Cloudflare)",
    reload: "Recarregar",
    dismiss: "Fechar",
  },
} as const satisfies LanguageMessages;
