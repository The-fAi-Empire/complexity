import { CommandEmpty } from "@/components/ui/command";
import CommandItemSkeleton from "@/plugins/command-menu/components/Skeletons";

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
        {t(
          "plugin-command-menu:commandMenu.threads.commandItems.errorFetching",
        )}
      </CommandEmpty>
    );

  return (
    <CommandEmpty>
      {t("plugin-command-menu:commandMenu.threads.commandItems.noThreadsFound")}
    </CommandEmpty>
  );
}
