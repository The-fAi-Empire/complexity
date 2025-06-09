import { lazily } from "react-lazily";

import { withPluginsGuard } from "@/plugins/_core/plugins-guard/withPluginsGuard";

const { SlashCommandMenu } = lazily(
  () => import("@/plugins/slash-command/SlashCommandMenu"),
);

const SlashCommandMenuWrapper = withPluginsGuard(SlashCommandMenu, {
  desktopOnly: true,
  dependentPluginIds: ["slashCommand"],
});

export default SlashCommandMenuWrapper;
