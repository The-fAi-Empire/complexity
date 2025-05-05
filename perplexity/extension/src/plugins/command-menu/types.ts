import type { ComponentProps } from "react";

export type CommandItemProps = {
  eager: boolean;
  group: string;
  icon: React.ComponentType<ComponentProps<"svg">>;
  keybinding: string[];
  keywords: string[];
  onSelect: () => void;
  priority: number;
  show: boolean;
  title: string;
  titleSuffixBadge?: string;
  value: string;
};
