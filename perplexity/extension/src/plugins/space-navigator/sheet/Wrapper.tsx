import { lazily } from "react-lazily";

import { withPluginsGuard } from "@/plugins/_core/plugins-guard/withPluginsGuard";

const { SpaceNavigator } = lazily(
  () => import("@/plugins/space-navigator/sheet/SpaceNavigator"),
);

const SpaceNavigatorWrapper = withPluginsGuard(SpaceNavigator, {
  dependentPluginIds: ["spaceNavigator"],
  allowIncognito: false,
  requiresLoggedIn: true,
  mobileOnly: true,
});

export default SpaceNavigatorWrapper;
