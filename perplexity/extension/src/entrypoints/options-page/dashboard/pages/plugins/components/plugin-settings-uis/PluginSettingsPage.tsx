import { LuChevronLeft } from "react-icons/lu";
import { Link } from "react-router-dom";

import { PluginRegistry } from "@/data/plugin-registry/index";
import type { PluginId } from "@/data/plugin-registry/types";
import { PLUGIN_SETTINGS_UIS } from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-settings-uis/loader";

type PluginSettingsPageProps = {
  pluginId: PluginId;
};

export default function PluginSettingsPage({
  pluginId,
}: PluginSettingsPageProps) {
  const plugin = PluginRegistry.manifests[pluginId];

  return (
    <div className="x:space-y-6">
      <Link
        to="/plugins"
        className="x:mb-4 x:flex x:items-center x:gap-2 x:text-muted-foreground x:transition x:hover:text-foreground"
      >
        <LuChevronLeft />
        Back to plugins
      </Link>
      <div>
        <h1 className="x:text-2xl x:font-bold">{plugin.title}</h1>
        <p className="x:mt-2 x:text-muted-foreground">{plugin.description}</p>
      </div>
      {PLUGIN_SETTINGS_UIS[plugin.id]!.component}
    </div>
  );
}
