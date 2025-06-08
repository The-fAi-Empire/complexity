import type { LanguageMessages } from "@complexity/i18n";

export default {
  action: "Exportovať",
  format: {
    label: "Zvoliť formát",
    placeholder: "Vyberte formát",
  },
  includeCitations: "Zahrnúť citácie",
  actions: {
    download: "Stiahnuť",
    copy: "Kopírovať",
  },
  errors: {
    downloadFailed: {
      title: "❌ Sťahovanie zlyhalo",
      unknownError: "Vyskytla sa neznáma chyba",
    },
  },
} as const satisfies LanguageMessages;
