import CommandPage from "@/plugins/command-menu/components/CommandPage";
import { useCurrentPage } from "@/plugins/command-menu/hooks/useCurrentPage";
import SpaceThreadCommandItems from "@/plugins/command-menu/pages/space-threads/SpaceThreadCommandItems";

const SpaceThreadsPage = memo(() => {
  const currentPage = useCurrentPage();

  const spaceSlug = currentPage?.args?.spaceSlug;

  if (!spaceSlug) {
    return null;
  }

  return (
    <CommandPage pageId="spaceThreads">
      <SpaceThreadCommandItems spaceSlug={spaceSlug} />
    </CommandPage>
  );
});

export default SpaceThreadsPage;
