import { isHotkeyPressed } from "react-hotkeys-hook";

import { asyncLoaderRegistry } from "@/plugins/_core/async-dep-registry";
import type { QueryBoxesDomObserverStoreType } from "@/plugins/_core/dom-observers/query-boxes/store";
import { queryBoxesDomObserverStore } from "@/plugins/_core/dom-observers/query-boxes/store";
import { isContentEditable } from "@/plugins/_core/ui/groups/query-box/utils";
import { ExtensionSettingsService } from "@/services/extension-settings";
import { insertText } from "@/utils/contenteditable-utils";

const OBSERVER_ID = "raw-text-paste";

function shouldApplyRawPaste(settings: { alwaysActive: boolean }) {
  return (
    settings.alwaysActive ||
    (!settings.alwaysActive && isHotkeyPressed(Key.Shift))
  );
}

function rawTextPaste(
  queryBoxTextboxes: QueryBoxesDomObserverStoreType["textbox"],
) {
  const settings =
    ExtensionSettingsService.cachedSync.plugins["queryBox:rawTextPaste"];

  Object.values(queryBoxTextboxes).forEach((textbox) => {
    if (!textbox) return;

    const $textbox = $(textbox);

    if (!$textbox.length || $textbox.attr(OBSERVER_ID)) return;

    $textbox.attr(OBSERVER_ID, "true");

    if (isContentEditable(textbox)) {
      textbox.addEventListener(
        "paste",
        function (e) {
          if (e.clipboardData && shouldApplyRawPaste(settings)) {
            if (e.clipboardData.types.includes("text/plain")) {
              e.preventDefault();
              e.stopPropagation();

              insertText(textbox, e.clipboardData.getData("text/plain"));

              return false;
            }
          }

          return true;
        },
        true,
      );
    } else {
      $textbox.on("paste", function (e) {
        const clipboardEvent = e.originalEvent as ClipboardEvent;

        if (clipboardEvent.clipboardData && shouldApplyRawPaste(settings)) {
          if (clipboardEvent.clipboardData.types.includes("text/plain")) {
            e.stopImmediatePropagation();
          }
        }
      });
    }
  });
}

declare module "@/plugins/_core/async-dep-registry" {
  interface AsyncLoadersRegistry {
    "plugin:queryBox:rawTextPaste": void;
  }
}

export default function loader() {
  asyncLoaderRegistry.register({
    id: "plugin:queryBox:rawTextPaste",
    dependencies: ["cache:pluginsStates", "cache:domSelectors"],
    loader: ({ "cache:pluginsStates": pluginsStates }) => {
      if (!pluginsStates["queryBox:rawTextPaste"]) return;

      queryBoxesDomObserverStore.subscribe(
        (store) => ({
          main: store.textbox.main,
          space: store.textbox.space,
          followUp: store.textbox.followUp,
        }),
        ({ main, space, followUp }) => {
          rawTextPaste({
            main,
            space,
            followUp,
          });
        },
        {
          equalityFn: deepEqual,
        },
      );
    },
  });
}
