import CommandPage from "@/plugins/command-menu/components/CommandPage";
import ThreadCommandItems from "@/plugins/command-menu/pages/threads/ThreadCommandItems";

const ThreadsPage = memo(() => {
  return (
    <CommandPage pageId="threads">
      <ThreadCommandItems />
    </CommandPage>
  );
});

export default ThreadsPage;
