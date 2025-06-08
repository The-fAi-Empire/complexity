import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Tiempo de sesión agotado",
    sessionTimeoutDescription:
      "Su sesión ha caducado (probablemente debido a Cloudflare)",
    reload: "Recargar",
    dismiss: "Cerrar",
  },
} as const satisfies LanguageMessages;
