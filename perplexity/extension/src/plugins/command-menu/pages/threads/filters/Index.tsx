import SortFilter from "@/plugins/command-menu/pages/threads/filters/SortFilter";
import SourceFilter from "@/plugins/command-menu/pages/threads/filters/SourceFilter";
import TemporaryThreadsFilter from "@/plugins/command-menu/pages/threads/filters/TemporaryThreadsFilter";
import TypeFilter from "@/plugins/command-menu/pages/threads/filters/TypeFilter";

export default function ThreadsSearchFilters() {
  return (
    <div className="x:m-2 x:mt-4 x:flex x:items-center x:justify-between">
      <div className="x:flex x:items-center x:justify-center x:gap-2">
        <SourceFilter />
        <TypeFilter />
        <TemporaryThreadsFilter />
      </div>
      <SortFilter />
    </div>
  );
}
