import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Истек сесије",
    sessionTimeoutDescription:
      "Ваша сесија је истекла (највероватније због Cloudflare-а)",
    reload: "Поново учитај",
    dismiss: "Одбаци",
  },
} as const satisfies LanguageMessages;
