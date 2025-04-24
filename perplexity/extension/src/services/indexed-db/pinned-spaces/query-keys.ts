import { queryOptions } from "@tanstack/react-query";

import type { PinnedSpace } from "@/data/plugins/space-navigator/pinned-space.types";
import { getPinnedSpacesService } from "@/services/indexed-db/pinned-spaces";

export const pinnedSpacesQueries = {
  all: () => ["sidebarPinnedSpaces"] as const,

  list: {
    all: () => [...pinnedSpacesQueries.all(), "list"] as const,
    detail: () =>
      queryOptions({
        queryKey: [...pinnedSpacesQueries.list.all()] as const,
        queryFn: () => getPinnedSpacesService().getAll(),
      }),
  },

  get: {
    all: () => [...pinnedSpacesQueries.all(), "get"] as const,
    detail: (uuid: PinnedSpace["uuid"]) =>
      queryOptions({
        queryKey: [...pinnedSpacesQueries.get.all(), { uuid }] as const,
        queryFn: async () => {
          const item = await getPinnedSpacesService().get(uuid);
          if (item == null) throw new Error("Item not found");
          return item;
        },
      }),
  },
};
