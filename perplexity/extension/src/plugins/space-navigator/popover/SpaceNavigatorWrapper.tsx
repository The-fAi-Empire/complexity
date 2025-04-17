import { LuSearch } from "react-icons/lu";

import { Portal } from "@/components/ui/portal";
import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { useIsMobileStore } from "@/hooks/use-is-mobile-store";
import { useInsertCss } from "@/hooks/useInsertCss";
import { useSidebarDomObserverStore } from "@/plugins/_core/dom-observers/sidebar/store";
import hideNativeHistoryCss from "@/plugins/space-navigator/popover/hide-native-history.css?inline";
import SidebarPinnedSpacesVisToggle from "@/plugins/space-navigator/popover/PinnedItemsVisToggle";
import SidebarPinnedSpaces from "@/plugins/space-navigator/popover/PinnedSpaces";
import { default as SpaceNavigatorDesktop } from "@/plugins/space-navigator/popover/SpaceNavigator";
import { SpaceNavigator as SpaceNavigatorMobile } from "@/plugins/space-navigator/sheet/SpaceNavigator";

export function SpaceNavigatorWrapper() {
  const isMobile = useIsMobileStore((store) => store.isMobile);

  useInsertCss({
    css: hideNativeHistoryCss,
    id: "space-navigator-hide-native-history",
  });

  const spaceButtonWrapper = useSidebarDomObserverStore(
    (state) => state.$spaceButtonWrapper?.[0],
    deepEqual,
  );

  const triggerButtonsPortalContainer = useSidebarDomObserverStore(
    (state) => state.$spaceButtonTriggerButtonsWrapper?.[0],
    deepEqual,
  );

  const $pinnedSpacesPortalContainer = useMemo(() => {
    if (spaceButtonWrapper == null) return null;

    const $spaceButtonWrapper = $(spaceButtonWrapper);

    const $existingPinnedSpacesPortalContainer = $spaceButtonWrapper
      .parent()
      .find(
        `[data-cplx-component="${DomSelectorsRegistry.internalAttributes.SIDEBAR.PINNED_SPACES_PORTAL_CONTAINER}"]`,
      );

    if ($existingPinnedSpacesPortalContainer.length) {
      return $existingPinnedSpacesPortalContainer;
    }

    const $portalContainer = $("<div>")
      .internalComponentAttr(
        DomSelectorsRegistry.internalAttributes.SIDEBAR
          .PINNED_SPACES_PORTAL_CONTAINER,
      )
      .appendTo($spaceButtonWrapper);

    return $portalContainer;
  }, [spaceButtonWrapper]);

  return (
    <>
      {triggerButtonsPortalContainer != null && (
        <Portal container={triggerButtonsPortalContainer}>
          <div className="x:-mr-2 x:flex x:w-full x:flex-1 x:items-center x:justify-end x:gap-1">
            <div className="x:hidden x:md:block">
              <SidebarPinnedSpacesVisToggle />
            </div>
            {isMobile ? (
              <SpaceNavigatorMobile Icon={LuSearch} />
            ) : (
              <SpaceNavigatorDesktop />
            )}
          </div>
        </Portal>
      )}
      {$pinnedSpacesPortalContainer != null &&
        $pinnedSpacesPortalContainer.length > 0 && (
          <Portal container={$pinnedSpacesPortalContainer[0]}>
            <SidebarPinnedSpaces />
          </Portal>
        )}
    </>
  );
}
