import { onMessage } from "webext-bridge/window";

declare module "@/types/webext-bridge-overrides" {
  interface EventHandlers {
    "spa-router:push": ({ url }: { url: string }) => void;
    "spa-router:replace": ({ url }: { url: string }) => void;
    "spa-router:openInNewTab": ({ url }: { url: string }) => void;
  }
}

export function setupSpaRouterListeners() {
  onMessage("spa-router:push", ({ data: { url } }) => {
    window.history.pushState({}, "", url);
  });

  onMessage("spa-router:replace", ({ data: { url } }) => {
    window.history.replaceState({}, "", url);
  });

  onMessage("spa-router:openInNewTab", ({ data: { url } }) => {
    window.open(url, "_blank");
  });
}
