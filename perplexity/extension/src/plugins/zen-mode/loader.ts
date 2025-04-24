import { asyncLoaderRegistry } from "@/plugins/_core/async-dep-registry";
import {
  alwaysHideRelatedQuestionsCssResourceConfig,
  zenModeCssResourceConfig,
} from "@/plugins/zen-mode/index.remote-resources";
import { getVersionedRemoteResource } from "@/services/cplx-api/versioned-remote-resources/utils";
import { ExtensionSettingsService } from "@/services/extension-settings";
import { insertCss } from "@/utils/utils";

declare module "@/plugins/_core/async-dep-registry" {
  interface AsyncLoadersRegistry {
    "plugin:zenMode": void;
  }
}

export default async function loader() {
  asyncLoaderRegistry.register({
    id: "plugin:zenMode",
    dependencies: ["cache:pluginsStates", "cache:extensionSettings"],
    loader: async ({ "cache:pluginsStates": pluginsStates }) => {
      if (!pluginsStates["zenMode"]) return;

      insertCss({
        css: await getVersionedRemoteResource(zenModeCssResourceConfig),
        id: "zen-mode",
      });

      const settings = ExtensionSettingsService.cachedSync;

      if (settings?.plugins["zenMode"].persistent) {
        $(document.body).attr(
          "data-cplx-zen-mode",
          settings?.plugins["zenMode"].lastState.toString() ?? "false",
        );
      }

      if (settings?.plugins["zenMode"].alwaysHideRelatedQuestions) {
        insertCss({
          css: await getVersionedRemoteResource(
            alwaysHideRelatedQuestionsCssResourceConfig,
          ),
          id: "always-hide-related-questions",
        });

        $(document.body).attr(
          "data-cplx-zen-mode-always-hide-related-questions",
          "true",
        );
      }
    },
  });
}
