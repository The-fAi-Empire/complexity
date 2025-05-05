import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { pplxApiQueries } from "@/services/pplx-api/query-keys";

export default function usePplxInfiniteThreads({
  searchTerm,
}: {
  searchTerm: string;
}) {
  const query = useInfiniteQuery({
    ...pplxApiQueries.threads.infinite.detail({
      initialPageParam: 0,
      searchTerm,
    }),
    staleTime: 5000,
    placeholderData: keepPreviousData,
  });

  return query;
}
