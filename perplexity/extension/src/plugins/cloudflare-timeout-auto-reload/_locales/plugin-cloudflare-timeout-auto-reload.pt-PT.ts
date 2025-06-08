import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Tempo limite da sessão",
    sessionTimeoutDescription:
      "A sua sessão expirou (provavelmente devido ao Cloudflare)",
    reload: "Recarregar",
    dismiss: "Fechar",
  },
} as const satisfies LanguageMessages;
