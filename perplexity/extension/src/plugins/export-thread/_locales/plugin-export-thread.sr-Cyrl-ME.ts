import type { LanguageMessages } from "@complexity/i18n";

export default {
  action: "Извоз",
  format: {
    label: "Изаберите формат",
    placeholder: "Изаберите формат",
  },
  includeCitations: "Укључи цитате",
  actions: {
    download: "Преузми",
    copy: "Копирај",
  },
  errors: {
    downloadFailed: {
      title: "❌ Преузимање није успело",
      unknownError: "Дошло је до непознате грешке",
    },
  },
} as const satisfies LanguageMessages;
