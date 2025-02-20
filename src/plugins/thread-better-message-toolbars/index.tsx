import { useInsertCss } from "@/hooks/useInsertCss";
import normalizeQueryHoverContainerCss from "@/plugins/thread-better-message-toolbars/normalize-query-hover-container.css?inline";
import stickyCss from "@/plugins/thread-better-message-toolbars/sticky.css?inline";
import { useObserveStuckToolbar } from "@/plugins/thread-better-message-toolbars/useObserveStuckToolbar";
import { ExtensionLocalStorageService } from "@/services/extension-local-storage";

export default function BetterMessageToolbarsWrapper() {
  const settings = ExtensionLocalStorageService.getCachedSync();

  useObserveStuckToolbar();

  useInsertCss({
    id: "better-message-toolbars-sticky",
    css: stickyCss,
    inject: settings?.plugins["thread:betterMessageToolbars"].sticky,
  });

  useInsertCss({
    id: "normalize-query-hover-container",
    css: normalizeQueryHoverContainerCss,
  });

  return null;
}
