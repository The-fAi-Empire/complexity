import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "工作階段逾時",
    sessionTimeoutDescription: "您的工作階段已逾時（很可能是因為 Cloudflare）",
    reload: "重新載入",
    dismiss: "關閉",
  },
} as const satisfies LanguageMessages;
