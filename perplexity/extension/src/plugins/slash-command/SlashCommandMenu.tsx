import { PopoverRootProvider } from "@ark-ui/react";

import CommandContent from "@/plugins/slash-command/components/CommandContent";
import useSlashCommandPanel from "@/plugins/slash-command/hooks/useSlashCommandPanel";

export function SlashCommandMenu() {
  const popover = useSlashCommandPanel();

  return (
    <PopoverRootProvider lazyMount unmountOnExit value={popover}>
      <CommandContent />
    </PopoverRootProvider>
  );
}
