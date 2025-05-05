import { useCurrentPage } from "@/plugins/command-menu/hooks/useCurrentPage";
import type { CommandMenuPageId } from "@/plugins/command-menu/store/slices/pages/types";

type CommandPageProps = {
  pageId: CommandMenuPageId | null;
  children: React.ReactNode;
};

export default function CommandPage({ pageId, children }: CommandPageProps) {
  const currentPage = useCurrentPage();

  if (currentPage?.pageId != pageId) return null;

  return children;
}
