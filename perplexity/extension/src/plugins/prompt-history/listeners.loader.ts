import { asyncLoaderRegistry } from "@/plugins/_core/async-dep-registry";
import { spaRouterStoreSubscribe } from "@/plugins/_core/main-world/spa-router/listeners.loader";
import { handlePromptSave } from "@/plugins/prompt-history/utils";

declare module "@/plugins/_core/async-dep-registry" {
  interface AsyncLoadersRegistry {
    "plugin:queryBox:promptHistory:listeners": void;
  }
}

export default function loader() {
  asyncLoaderRegistry.register({
    id: "plugin:queryBox:promptHistory:listeners",
    dependencies: ["cache:pluginsStates", "cache:extensionSettings"],
    loader: ({
      "cache:pluginsStates": pluginsStates,
      "cache:extensionSettings": extensionSettings,
    }) => {
      if (
        !pluginsStates["slashCommand"] ||
        !pluginsStates["promptHistory"] ||
        !extensionSettings.plugins["promptHistory"].trigger.onNavigation
      )
        return;

      // Soft navigation
      spaRouterStoreSubscribe((params) => {
        if (params.state === "pending") {
          handlePromptSave({
            url: params.url,
            type: "soft",
          });
        }
      });

      // Hard navigation
      window.addEventListener("beforeunload", () => {
        handlePromptSave({ url: window.location.pathname, type: "hard" });
      });
    },
  });
}
