import { InstantCssService } from "@/services/instant-css";
import { InstantCssInjector } from "@/services/instant-css/injector.proxy-service";

export default async function listener() {
  chrome.runtime.onStartup.addListener(async () => {
    if (!(await InstantCssService.hasPermissions())) return;

    await InstantCssInjector.forceInjectAllPplxTabs();
  });
}
