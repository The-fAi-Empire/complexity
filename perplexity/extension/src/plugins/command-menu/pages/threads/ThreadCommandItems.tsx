import { useDebounce } from "@uidotdev/usehooks";

import { CommandGroup } from "@/components/ui/command";
import { CommandItemSkeleton } from "@/components/ui/command";
import ThreadItem from "@/plugins/command-menu/pages/threads/ThreadItem";
import ThreadListLoader from "@/plugins/command-menu/pages/threads/ThreadListLoader";
import useLoadMoreItems from "@/plugins/command-menu/pages/threads/useLoadMoreItems";
import usePplxInfiniteThreads from "@/plugins/command-menu/pages/threads/usePplxInfiniteThreads";
import { useCommandMenuStore } from "@/plugins/command-menu/store";

export default function ThreadCommandItems() {
  const searchValue = useDebounce(
    useCommandMenuStore((store) => store.searchValue),
    300,
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPlaceholderData,
    isFetchingNextPage,
  } = usePplxInfiniteThreads({
    searchTerm: searchValue,
  });

  const { triggerRef } = useLoadMoreItems({
    hasNextPage,
    isFetching,
    fetchNextPage,
  });

  return (
    <>
      {!isLoading && !isError && (
        <>
          <CommandGroup
            className={cn({
              "x:opacity-50": isPlaceholderData,
            })}
          >
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
          {isFetchingNextPage && (
            <CommandItemSkeleton count={3} className="x:h-14" />
          )}
          {hasNextPage && <div ref={triggerRef} className="x:h-30" />}
        </>
      )}

      <ThreadListLoader isLoading={isLoading} isError={isError} />
    </>
  );
}
