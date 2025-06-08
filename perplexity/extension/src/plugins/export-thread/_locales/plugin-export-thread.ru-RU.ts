import type { LanguageMessages } from "@complexity/i18n";

export default {
  action: "Экспорт",
  format: {
    label: "Выбрать формат",
    placeholder: "Выберите формат",
  },
  includeCitations: "Включить цитаты",
  actions: {
    download: "Скачать",
    copy: "Копировать",
  },
  errors: {
    downloadFailed: {
      title: "❌ Не удалось скачать",
      unknownError: "Произошла неизвестная ошибка",
    },
  },
} as const satisfies LanguageMessages;
