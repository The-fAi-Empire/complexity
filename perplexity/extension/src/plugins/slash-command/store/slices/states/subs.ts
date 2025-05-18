import type { SlashCommandMenuStore } from "@/plugins/slash-command/store/types";

export function statesSubscriptions(
  slashCommandMenuStore: SlashCommandMenuStore,
) {
  slashCommandMenuStore.subscribe(
    (state) => state.open,
    (open) => {
      if (open) return;

      requestAnimationFrame(() => {
        slashCommandMenuStore.getState().anchor.inputField?.focus();
        slashCommandMenuStore.getState().restoreText();
      });
    },
  );
}
