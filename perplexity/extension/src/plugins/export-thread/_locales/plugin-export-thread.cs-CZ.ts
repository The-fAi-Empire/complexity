import type { LanguageMessages } from "@complexity/i18n";

export default {
  action: "Exportovat",
  format: {
    label: "Zvolit formát",
    placeholder: "Vyberte formát",
  },
  includeCitations: "Zahrnout citace",
  actions: {
    download: "Stáhnout",
    copy: "Kopírovat",
  },
  errors: {
    downloadFailed: {
      title: "❌ Stahování selhalo",
      unknownError: "Došlo k neznámé chybě",
    },
  },
} as const satisfies LanguageMessages;
