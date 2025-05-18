import { PluginRegistry } from "@/data/plugin-registry/index";
import { PLUGIN_CATEGORIES } from "@/data/plugin-registry/plugin-tags";
import type { PluginId } from "@/data/plugin-registry/types";

export function usePluginCategories({
  filteredPluginIds,
}: {
  filteredPluginIds: PluginId[];
}) {
  return useMemo(() => {
    const pluginsByCategory = Object.keys(PLUGIN_CATEGORIES).reduce<
      Record<string, PluginId[]>
    >((acc, category) => {
      acc[category] = [];
      return acc;
    }, {});

    for (const pluginId of filteredPluginIds) {
      const plugin = PluginRegistry.manifests[pluginId];
      for (const category of plugin.categories) {
        pluginsByCategory[category] = pluginsByCategory[category] || [];
        pluginsByCategory[category].push(pluginId);
      }
    }

    for (const category in pluginsByCategory) {
      if (!pluginsByCategory[category]) continue;

      pluginsByCategory[category].sort((a, b) => {
        const titleA = PluginRegistry.manifests[a].title;
        const titleB = PluginRegistry.manifests[b].title;
        const isCoreA = titleA.endsWith(": Core");
        const isCoreB = titleB.endsWith(": Core");

        if (isCoreA && !isCoreB) return -1;
        if (!isCoreA && isCoreB) return 1;
        return 0;
      });
    }

    const nonEmptyCategories = Object.fromEntries(
      Object.entries(pluginsByCategory).filter(([, ids]) => ids.length > 0),
    );

    return {
      pluginsByCategory: nonEmptyCategories,
    };
  }, [filteredPluginIds]);
}
