import type { LanguageMessages } from "@complexity/i18n";

export default {
  actionDialog: {
    sessionTimeoutTitle: "Munkamenet időtúllépés",
    sessionTimeoutDescription:
      "A munkamenete lejárt (valószínűleg a Cloudflare miatt)",
    reload: "Újratöltés",
    dismiss: "Bezárás",
  },
} as const satisfies LanguageMessages;
