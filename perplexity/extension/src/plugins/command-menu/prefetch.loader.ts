import { queryClient } from "@/data/query-client";
import { pplxApiQueries } from "@/services/pplx-api/query-keys";

export default function loader() {
  queryClient.prefetchQuery(pplxApiQueries.spaces.detail());
  queryClient.prefetchInfiniteQuery(
    pplxApiQueries.threads.infinite.detail({
      searchTerm: "",
      initialPageParam: 0,
    }),
  );
}
