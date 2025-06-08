import { CommandEmpty } from "@/components/ui/command";
import { CommandItemSkeleton } from "@/components/ui/command";

type ThreadListLoaderProps = {
  isLoading: boolean;
  isError: boolean;
};

export default function ThreadListLoader({
  isLoading,
  isError,
}: ThreadListLoaderProps) {
  if (isLoading) return <CommandItemSkeleton count={5} className="x:h-14" />;
  if (isError)
    return (
      <CommandEmpty>
        {t("plugin-command-menu.threads.commandItems.errorFetching")}
      </CommandEmpty>
    );

  return (
    <CommandEmpty>
      {t("plugin-command-menu.threads.commandItems.noThreadsFound")}
    </CommandEmpty>
  );
}
