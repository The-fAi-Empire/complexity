import { queryOptions } from "@tanstack/react-query";

import { getBetterCodeBlocksFineGrainedOptionsService } from "@/services/indexed-db/better-code-blocks";

export const betterCodeBlocksFineGrainedOptionsQueries = {
  all: () => ["betterCodeBlocksFineGrainedOptions"] as const,

  list: {
    all: () =>
      [...betterCodeBlocksFineGrainedOptionsQueries.all(), "list"] as const,
    detail: () =>
      queryOptions({
        queryKey: [
          ...betterCodeBlocksFineGrainedOptionsQueries.list.all(),
        ] as const,
        queryFn: () => getBetterCodeBlocksFineGrainedOptionsService().getAll(),
      }),
  },

  get: {
    all: () =>
      [...betterCodeBlocksFineGrainedOptionsQueries.all(), "get"] as const,
    detail: (language: string) =>
      queryOptions({
        queryKey: [
          ...betterCodeBlocksFineGrainedOptionsQueries.get.all(),
          { language },
        ] as const,
        queryFn: () =>
          getBetterCodeBlocksFineGrainedOptionsService().get(language),
      }),
  },
};
