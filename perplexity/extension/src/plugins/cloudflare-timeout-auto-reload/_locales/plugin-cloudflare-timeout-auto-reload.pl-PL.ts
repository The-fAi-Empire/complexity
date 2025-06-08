import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Przekroczono limit czasu sesji",
    sessionTimeoutDescription:
      "Twoja sesja wygasła (prawdopodobnie z powodu Cloudflare)",
    reload: "Odśwież",
    dismiss: "Zamknij",
  },
} as const satisfies LanguageMessages;
