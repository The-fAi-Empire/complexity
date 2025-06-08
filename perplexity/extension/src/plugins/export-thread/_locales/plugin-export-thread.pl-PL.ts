import type { LanguageMessages } from "@complexity/i18n";

export default {
  action: "Eksportuj",
  format: {
    label: "Wybierz format",
    placeholder: "Wybierz format",
  },
  includeCitations: "Dołącz cytaty",
  actions: {
    download: "Pobierz",
    copy: "Kopiuj",
  },
  errors: {
    downloadFailed: {
      title: "❌ Pobieranie nie powiodło się",
      unknownError: "Wystąpił nieznany błąd",
    },
  },
} as const satisfies LanguageMessages;
