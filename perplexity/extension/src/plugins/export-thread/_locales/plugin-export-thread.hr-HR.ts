import type { LanguageMessages } from "@complexity/i18n";

export default {
  action: "Izvoz",
  format: {
    label: "Odaberi format",
    placeholder: "Odaberi format",
  },
  includeCitations: "Uključi citate",
  actions: {
    download: "Preuzmi",
    copy: "Kopiraj",
  },
  errors: {
    downloadFailed: {
      title: "❌ Preuzimanje nije uspjelo",
      unknownError: "Dogodila se nepoznata pogreška",
    },
  },
} as const satisfies LanguageMessages;
