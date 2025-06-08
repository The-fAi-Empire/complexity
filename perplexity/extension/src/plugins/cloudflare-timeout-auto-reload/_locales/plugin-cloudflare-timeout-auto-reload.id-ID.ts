import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Sesi habis",
    sessionTimeoutDescription:
      "Sesi Anda telah habis (kemungkinan besar karena Cloudflare)",
    reload: "Muat ulang",
    dismiss: "Tutup",
  },
} as const satisfies LanguageMessages;
