import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "सत्र समाप्त",
    sessionTimeoutDescription:
      "आपका सत्र समाप्त हो गया है (संभवतः Cloudflare के कारण)",
    reload: "पुनः लोड करें",
    dismiss: "बंद करें",
  },
} as const satisfies LanguageMessages;
