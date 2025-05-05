import { useDebounce } from "@uidotdev/usehooks";

import { CommandGroup } from "@/components/ui/command";
import CommandItemSkeleton from "@/plugins/command-menu/components/Skeletons";
import usePplxInfiniteSpaceThreads from "@/plugins/command-menu/pages/space-threads/usePplxInfiniteSpaceThreads";
import ThreadItem from "@/plugins/command-menu/pages/threads/ThreadItem";
import ThreadListLoader from "@/plugins/command-menu/pages/threads/ThreadListLoader";
import useLoadMoreItems from "@/plugins/command-menu/pages/threads/useLoadMoreItems";
import { useCommandMenuStore } from "@/plugins/command-menu/store";
import type { Space } from "@/services/pplx-api/pplx-api.types";

export default function SpaceThreadCommandItems({
  spaceSlug,
}: {
  spaceSlug: Space["slug"];
}) {
  const searchValue = useDebounce(
    useCommandMenuStore((store) => store.searchValue),
    300,
  );

  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePplxInfiniteSpaceThreads({
    spaceSlug,
  });

  const { triggerRef } = useLoadMoreItems({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data,
  });

  return (
    <>
      {!isLoading && !isError && (
        <>
          <CommandGroup>
            {data?.pages.map((page) =>
              page.map((thread) => (
                <ThreadItem
                  key={thread.uuid}
                  thread={thread}
                  searchValue={searchValue}
                />
              )),
            )}
          </CommandGroup>
          {!isFetching && hasNextPage && (
            <div ref={triggerRef} className="x:h-30" />
          )}
          {isFetchingNextPage && (
            <CommandItemSkeleton count={3} className="x:h-14" />
          )}
        </>
      )}

      <ThreadListLoader isLoading={isLoading} isError={isError} />
    </>
  );
}
