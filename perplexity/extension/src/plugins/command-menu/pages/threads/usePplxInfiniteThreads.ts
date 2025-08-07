import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import type { ThreadsSearchPayload } from "@/services/pplx-api/pplx-api.types";
import { pplxApiQueries } from "@/services/pplx-api/query-keys";

export default function usePplxInfiniteThreads(
  params: Omit<ThreadsSearchPayload, "offset" | "limit">,
) {
  const query = useInfiniteQuery({
    ...pplxApiQueries.threads.infinite.detail({
      initialPageParam: 0,
      ...params,
    }),
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  return query;
}
