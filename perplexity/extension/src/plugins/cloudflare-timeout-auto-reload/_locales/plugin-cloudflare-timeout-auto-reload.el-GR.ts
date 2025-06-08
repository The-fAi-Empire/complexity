import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Λήξη συνεδρίας",
    sessionTimeoutDescription:
      "Η συνεδρία σας έχει λήξει (πιθανότατα λόγω του Cloudflare)",
    reload: "Επαναφόρτωση",
    dismiss: "Παράβλεψη",
  },
} as const satisfies LanguageMessages;
