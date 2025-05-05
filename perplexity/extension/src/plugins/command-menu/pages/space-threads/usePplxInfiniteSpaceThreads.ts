import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import type { Space } from "@/services/pplx-api/pplx-api.types";
import { pplxApiQueries } from "@/services/pplx-api/query-keys";

export default function usePplxInfiniteSpaceThreads({
  spaceSlug,
}: {
  spaceSlug: Space["slug"];
}) {
  const query = useInfiniteQuery({
    ...pplxApiQueries.space.threads.infinite.detail({
      initialPageParam: 0,
      spaceSlug,
    }),
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  return query;
}
