import { isHotkeyPressed } from "react-hotkeys-hook";

import PplxSpace from "@/components/icons/PplxSpace";
import { Badge } from "@/components/ui/badge";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandItemRightAttributes,
  CommandItemTitle,
} from "@/components/ui/command";
import { formatRelativeTime } from "@/data/dayjs";
import {
  openInNewTab,
  softNavigate,
} from "@/plugins/_core/main-world/spa-router/utils";
import CommandItemSkeleton from "@/plugins/command-menu/components/Skeletons";
import SpacesSearchItemsFooter from "@/plugins/command-menu/pages/spaces/Footer";
import SpacesSearchItemsSidecar from "@/plugins/command-menu/pages/spaces/Sidecar";
import {
  commandMenuStore,
  useCommandMenuStore,
} from "@/plugins/command-menu/store";
import usePplxSpaces from "@/services/pplx-api/hooks/usePplxSpaces";
import { emojiCodeToString } from "@/utils/utils";

export default function SpaceCommandItems() {
  const sidecarOpen = useCommandMenuStore((store) => store.sidecarOpen);

  const { data, isLoading, isError } = usePplxSpaces();

  if (isLoading) return <CommandItemSkeleton count={5} />;
  if (isError)
    return (
      <CommandEmpty>
        {t("plugin-command-menu:commandMenu.spaces.commandItems.errorFetching")}
      </CommandEmpty>
    );

  return (
    <>
      <CommandGroup>
        {data?.map((space) => (
          <a
            key={space.uuid}
            href={`/collections/${space.slug}`}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <CommandItem
              value={space.uuid}
              keywords={space.title.split(" ")}
              className="x:flex-col x:items-start x:justify-center x:gap-2"
              onSelect={() => {
                if (isHotkeyPressed(Key.Alt)) {
                  openInNewTab(`/collections/${space.slug}`);
                  commandMenuStore.getState().setOpen(false);
                } else if (isHotkeyPressed(Key.Shift)) {
                  commandMenuStore.getState().pushPage({
                    pageId: "spaceThreads",
                    args: {
                      spaceSlug: space.slug,
                    },
                    searchPlaceholder: t(
                      "plugin-command-menu:commandMenu.spaces.footer.searchSpacePlaceholder",
                      { spaceName: space.title },
                    ),
                    shouldLocalFilter: true,
                    sidecarOpen: false,
                  });
                } else {
                  softNavigate(`/collections/${space.slug}`);
                  commandMenuStore.getState().setOpen(false);
                }
              }}
            >
              <CommandItemTitle className="x:flex x:w-full x:items-center x:justify-center">
                <div className="x:flex x:min-w-0 x:flex-1 x:items-center x:gap-4">
                  <div className="x:flex x:items-center x:gap-2">
                    {space.emoji ? (
                      <div>{emojiCodeToString(space.emoji)}</div>
                    ) : (
                      <PplxSpace />
                    )}
                    <div className="x:line-clamp-1">{space.title}</div>
                  </div>
                  {window.location.pathname.includes(space.slug) && (
                    <Badge variant="outline">
                      {t("plugin-command-menu:commandMenu.navigation.current")}
                    </Badge>
                  )}
                </div>
                <CommandItemRightAttributes className="x:ml-2 x:shrink-0 x:text-xs x:text-nowrap x:text-muted-foreground">
                  {formatRelativeTime(space.updated_datetime)}
                </CommandItemRightAttributes>
              </CommandItemTitle>
              {!sidecarOpen && space.description && (
                <div className="x:line-clamp-2 x:text-xs x:text-muted-foreground">
                  {space.description}
                </div>
              )}
            </CommandItem>
          </a>
        ))}
      </CommandGroup>
      <SpacesSearchItemsFooter />
      <SpacesSearchItemsSidecar />
      <CommandEmpty>
        {t("plugin-command-menu:commandMenu.spaces.commandItems.noSpacesFound")}
      </CommandEmpty>
    </>
  );
}
