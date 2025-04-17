import { lazily } from "react-lazily";

import { withPluginsGuard } from "@/plugins/_core/plugins-guard/withPluginsGuard";

const { SidebarToggleableRecentThreads } = lazily(
  () =>
    import(
      "@/plugins/sidebar-toggleable-recent-threads/SidebarToggleableRecentThreads"
    ),
);

const SidebarToggleableRecentThreadsWrapper = withPluginsGuard(
  SidebarToggleableRecentThreads,
  {
    dependentPluginIds: ["sidebar:toggleableRecentThreads"],
    desktopOnly: true,
  },
);

export default SidebarToggleableRecentThreadsWrapper;
