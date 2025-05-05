import CommandPage from "@/plugins/command-menu/components/CommandPage";
import SpaceCommandItems from "@/plugins/command-menu/pages/spaces/SpaceCommandItems";

const SpacesPage = memo(() => {
  return (
    <CommandPage pageId="spaces">
      <SpaceCommandItems />
    </CommandPage>
  );
});

export default SpacesPage;
