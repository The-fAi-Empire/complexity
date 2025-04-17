import SidebarToggleableRecentThreadsWrapper from "@/plugins/sidebar-toggleable-recent-threads/Wrapper";
import SpaceNavigatorLazyWrapper from "@/plugins/space-navigator/popover/LazyWrapper";

export default function SidebarComponents() {
  return (
    <>
      <SpaceNavigatorLazyWrapper />

      <SidebarToggleableRecentThreadsWrapper />
    </>
  );
}
