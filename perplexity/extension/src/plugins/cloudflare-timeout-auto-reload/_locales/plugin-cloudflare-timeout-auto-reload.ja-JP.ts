import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "セッションタイムアウト",
    sessionTimeoutDescription:
      "セッションがタイムアウトしました（おそらくCloudflareによるものです）",
    reload: "再読み込み",
    dismiss: "閉じる",
  },
} as const satisfies LanguageMessages;
