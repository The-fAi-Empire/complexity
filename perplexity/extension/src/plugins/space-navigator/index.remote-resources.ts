import { z } from "zod";

import hideNativeHistoryCss from "@/plugins/space-navigator/popover/hide-native-history.css?inline";
import relativePositionedCardCss from "@/plugins/space-navigator/spaces-page/space-cards.css?inline";
import { defineVersionedRemoteResource } from "@/services/cplx-api/versioned-remote-resources";

export const hideNativeHistoryCssResourceConfig = defineVersionedRemoteResource(
  {
    name: "plugin.spaceNavigator.hideNativeHistoryCss",
    type: "css",
    fallback: hideNativeHistoryCss,
    zodSchema: z.string(),
  },
);

export const relativePositionedCardCssResourceConfig =
  defineVersionedRemoteResource({
    name: "plugin.spaceNavigator.relativePositionedCardCss",
    type: "css",
    fallback: relativePositionedCardCss,
    zodSchema: z.string(),
  });
