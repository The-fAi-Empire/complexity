import { slashCommandMenuStore } from "@/plugins/slash-command-menu/store";
import type { ContentTabId } from "@/plugins/slash-command-menu/store/slices/content-tab";

export function getMatchedContentTabCommand({
  wordAtCaret,
}: {
  wordAtCaret: string;
}) {
  const commands = slashCommandMenuStore.getState().contentTabCommandShortcuts;

  for (const [command, shortcut] of Object.entries(commands)) {
    if (wordAtCaret === `//${shortcut}`) {
      return command as ContentTabId;
    }
  }

  return null;
}

export function isAllowedKey(e: KeyboardEvent) {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;

  const alphanumericRegex = /^[a-zA-Z0-9]$/;
  const specialCharsRegex = /^[-_./\\]$/;

  return alphanumericRegex.test(e.key) || specialCharsRegex.test(e.key);
}
