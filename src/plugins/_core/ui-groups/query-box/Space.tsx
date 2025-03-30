import CsUiPluginsGuard from "@/components/plugins-guard/CsUiPluginsGuard";
import { Portal } from "@/components/ui/portal";
import { queryBoxesDomObserverStore } from "@/plugins/_core/dom-observers/query-boxes/store";
import { ScopedQueryBoxContextProvider } from "@/plugins/_core/ui-groups/query-box/context/context";
import { createToolbarPortalContainers } from "@/plugins/_core/ui-groups/query-box/utils";
import ForceWritingModeToggle from "@/plugins/force-writing-mode";
import BetterLanguageModelSelectorWrapper from "@/plugins/language-model-selector";
import SlashCommandMenuWrapper from "@/plugins/slash-command-menu";
import SlashCommandMenuTriggerButton from "@/plugins/slash-command-menu/TriggerButton";
import SpaceNavigatorWrapper from "@/plugins/space-navigator/query-box";

export default function SpaceQueryBoxWrapper() {
  const spaceQueryBox = queryBoxesDomObserverStore(
    (store) => store.main.$spaceQueryBox?.[0],
    deepEqual,
  );

  if (!spaceQueryBox) return null;

  const { leftToolbar, rightToolbar } = createToolbarPortalContainers({
    queryBox: spaceQueryBox,
  });

  return (
    <ScopedQueryBoxContextProvider storeValue={{ type: "space" }}>
      <Portal container={leftToolbar.leftContainer}>
        <CsUiPluginsGuard
          allowedAccountTypes={[["pro"], ["pro", "enterprise"]]}
          dependentPluginIds={["queryBox:languageModelSelector"]}
        >
          <BetterLanguageModelSelectorWrapper />
        </CsUiPluginsGuard>
      </Portal>
      <Portal container={leftToolbar.rightContainer}>
        <div className="x:flex x:flex-wrap x:items-center x:gap-2">
          <CsUiPluginsGuard
            desktopOnly
            dependentPluginIds={["queryBox:slashCommandMenu"]}
            additionalCheck={({ settings }) =>
              settings?.plugins["queryBox:slashCommandMenu"].showTriggerButton
            }
          >
            <SlashCommandMenuTriggerButton />
          </CsUiPluginsGuard>
          <CsUiPluginsGuard
            mobileOnly
            requiresLoggedIn
            dependentPluginIds={["spaceNavigator"]}
          >
            <SpaceNavigatorWrapper />
          </CsUiPluginsGuard>
        </div>
        <CsUiPluginsGuard
          desktopOnly
          dependentPluginIds={["queryBox:slashCommandMenu"]}
        >
          <SlashCommandMenuWrapper anchor={spaceQueryBox} />
        </CsUiPluginsGuard>
      </Portal>
      <Portal container={rightToolbar.leftContainer}>
        <CsUiPluginsGuard
          dependentPluginIds={["queryBox:spacesThreadsForceWritingMode"]}
        >
          <ForceWritingModeToggle />
        </CsUiPluginsGuard>
      </Portal>
    </ScopedQueryBoxContextProvider>
  );
}
