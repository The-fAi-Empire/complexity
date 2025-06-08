import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Sitzungszeitüberschreitung",
    sessionTimeoutDescription:
      "Ihre Sitzung ist abgelaufen (wahrscheinlich wegen Cloudflare)",
    reload: "Neu laden",
    dismiss: "Schließen",
  },
} as const satisfies LanguageMessages;
