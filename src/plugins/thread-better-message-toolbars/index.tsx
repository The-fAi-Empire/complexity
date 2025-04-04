import { useInsertCss } from "@/hooks/useInsertCss";
import hideUnnecessaryButtonsCss from "@/plugins/thread-better-message-toolbars/hide-unnecessary-buttons.css?inline";
import normalizeCss from "@/plugins/thread-better-message-toolbars/normalize.css?inline";
import stickyCss from "@/plugins/thread-better-message-toolbars/sticky.css?inline";
import { useObserveStuckToolbar } from "@/plugins/thread-better-message-toolbars/useObserveStuckToolbar";
import { ExtensionLocalStorageService } from "@/services/extension-local-storage";

export function BetterMessageToolbarsWrapper() {
  const settings = ExtensionLocalStorageService.getCachedSync();

  useObserveStuckToolbar();

  useInsertCss({
    id: "better-message-toolbars-normalize",
    css: normalizeCss,
  });

  useInsertCss({
    id: "better-message-toolbars-sticky",
    css: stickyCss,
    inject: settings?.plugins["thread:betterMessageToolbars"].sticky,
  });

  useInsertCss({
    id: "hide-unnecessary-buttons",
    css: hideUnnecessaryButtonsCss,
    inject:
      settings?.plugins["thread:betterMessageToolbars"].hideUnnecessaryButtons,
  });

  return null;
}
