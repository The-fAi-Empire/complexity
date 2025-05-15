import { PopoverRootProvider } from "@ark-ui/react";

import CommandContent from "@/plugins/slash-command-menu/components/CommandContent";
import useSlashCommandPanel from "@/plugins/slash-command-menu/hooks/useSlashCommandPanel";

export function SlashCommandMenu() {
  const popover = useSlashCommandPanel();

  return (
    <PopoverRootProvider lazyMount unmountOnExit value={popover}>
      <CommandContent />
    </PopoverRootProvider>
  );
}
