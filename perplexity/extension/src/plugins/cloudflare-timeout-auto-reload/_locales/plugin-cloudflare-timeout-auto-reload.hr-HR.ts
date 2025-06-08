import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Istek sesije",
    sessionTimeoutDescription:
      "Vaša sesija je istekla (najvjerojatnije zbog Cloudflare-a)",
    reload: "Ponovno učitaj",
    dismiss: "Zatvori",
  },
} as const satisfies LanguageMessages;
