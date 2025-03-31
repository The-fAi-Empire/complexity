import "@/utils/jquery.extensions";
import "@/entrypoints/content-scripts/loaders/loaders";

import { APP_CONFIG } from "@/app.config";
import { contentScriptGuard } from "@/utils/content-scripts-guard";
import { csLoaderRegistry } from "@/utils/cs-loader-registry";
import { insertCss, waitForDocumentReady } from "@/utils/utils";

(async () => {
  await waitForDocumentReady();

  if (!contentScriptGuard()) return;

  if (!APP_CONFIG.IS_DEV)
    insertCss({
      css: (
        await import(
          "@/entrypoints/content-scripts/loaders/cs-ui-plugins-loader/CsUiRoot"
        )
      ).csUiRootCss,
      id: "cs-ui-root",
    });

  csLoaderRegistry.executeAll();
})();
