import { lazily } from "react-lazily";

import { withPluginsGuard } from "@/plugins/_core/plugins-guard/withPluginsGuard";

const { ZenModeCommandMenuEntries } = lazily(
  () => import("@/plugins/zen-mode/command-menu-entries/Entries"),
);

const ZenModeCommandMenuEntriesWrapper = withPluginsGuard(
  ZenModeCommandMenuEntries,
  {
    dependentPluginIds: ["zenMode"],
  },
);

export default ZenModeCommandMenuEntriesWrapper;
