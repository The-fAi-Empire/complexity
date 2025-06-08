import type { LanguageMessages } from "@complexity/i18n";

export default {
  action: "Exportă",
  format: {
    label: "Alege formatul",
    placeholder: "Selectează un format",
  },
  includeCitations: "Include citările",
  actions: {
    download: "Descarcă",
    copy: "Copiază",
  },
  errors: {
    downloadFailed: {
      title: "❌ Descărcarea a eșuat",
      unknownError: "A apărut o eroare necunoscută",
    },
  },
} as const satisfies LanguageMessages;
