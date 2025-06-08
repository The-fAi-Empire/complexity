import type { LanguageMessages } from "@complexity/i18n";

export default {
  action: "Exportálás",
  format: {
    label: "Formátum választása",
    placeholder: "Válassz formátumot",
  },
  includeCitations: "Hivatkozások hozzáadása",
  actions: {
    download: "Letöltés",
    copy: "Másolás",
  },
  errors: {
    downloadFailed: {
      title: "❌ Sikertelen letöltés",
      unknownError: "Ismeretlen hiba történt",
    },
  },
} as const satisfies LanguageMessages;
