import { setupSpaRouterListeners } from "@/plugins/_core/main-world/spa-router/listeners.main-world";
import { proxySpaRouter } from "@/plugins/_core/main-world/spa-router/spa-router";

declare module "@/plugins/_core/main-world/types" {
  interface MainWorldCorePluginRegistry {
    spaRouter: void;
  }
}

onlyMainWorldGuard();

proxySpaRouter();
setupSpaRouterListeners();
