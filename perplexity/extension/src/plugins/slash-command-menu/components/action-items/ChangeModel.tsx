import { LuCpu } from "react-icons/lu";

import { CommandItem } from "@/components/ui/command";
import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { slashCommandMenuStore } from "@/plugins/slash-command-menu/store";

export default function ChangeModelActionItem() {
  const label = t(
    "plugin-slash-command-menu:slashCommandMenu.actionItems.changeModel.label",
  );

  return (
    <CommandItem
      value="m"
      keywords={label.split(" ")}
      className="x:min-h-10"
      onSelect={() => {
        slashCommandMenuStore.getState().actions.deleteTriggerWord();
        slashCommandMenuStore.getState().actions.setIsOpen(false);
        setTimeout(() => {
          $(
            `[data-testid=${DomSelectorsRegistry.testIds.QUERY_BOX.LANGUAGE_MODEL_SELECTOR}] button:last`,
          ).trigger("click");
        }, 0);
      }}
    >
      <div className="x:flex x:items-center x:gap-2">
        <div className="x:flex x:items-center x:gap-2">
          <LuCpu className="x:size-4" />
          <div>{label}</div>
        </div>
      </div>
    </CommandItem>
  );
}
