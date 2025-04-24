import { ExtensionPermissionsService } from "@/services/extension-permissions";

export function setupOptionPageListeners() {
  initColorScheme();
}

function initColorScheme() {
  ExtensionPermissionsService.setupReactiveListeners();

  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  $("html").attr("data-color-scheme", theme);
}
