import { PluginRegistry } from "@/data/plugin-registry/index";
import type {
  PluginTagValues,
  PluginCategory,
} from "@/data/plugin-registry/plugin-tags";

type UseFilteredPluginsParams = {
  searchTerm: string;
  selectedTags: PluginTagValues[];
  excludeTags: PluginTagValues[];
  categories: PluginCategory[];
};

export function useFilteredPlugins({
  searchTerm,
  selectedTags,
  excludeTags,
  categories,
}: UseFilteredPluginsParams) {
  const filteredPlugins = useMemo(() => {
    return Object.values(PluginRegistry.manifests)
      .filter((plugin) => {
        const matchesSearch = (plugin.title + plugin.description)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const hasTags = plugin.tags !== undefined && plugin.tags.length > 0;

        const matchesTags =
          selectedTags.length === 0 ||
          (hasTags && selectedTags.every((tag) => plugin.tags!.includes(tag)));

        const hasExcludedTags =
          hasTags && excludeTags.some((tag) => plugin.tags!.includes(tag));

        const matchesCategories =
          categories.length === 0 ||
          (plugin.categories !== undefined &&
            plugin.categories.some((category) =>
              categories.includes(category),
            ));

        return (
          matchesSearch && matchesTags && !hasExcludedTags && matchesCategories
        );
      })
      .map((plugin) => plugin.id);
  }, [excludeTags, searchTerm, selectedTags, categories]);

  return filteredPlugins;
}
