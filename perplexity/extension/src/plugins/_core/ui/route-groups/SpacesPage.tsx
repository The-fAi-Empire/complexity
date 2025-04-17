import { lazily } from "react-lazily";

import CsUiPluginsGuard from "@/plugins/_core/plugins-guard/CsUiPluginsGuard";

const { SpaceCardsWrapper } = lazily(
  () => import("@/plugins/space-navigator/spaces-page"),
);

export default function SpacesPageComponents() {
  return (
    <CsUiPluginsGuard requiresLoggedIn location={["collections_page"]}>
      <SpaceCardsWrapper />
    </CsUiPluginsGuard>
  );
}
