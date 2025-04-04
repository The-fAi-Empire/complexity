// --- [DO NOT REMOVE] ---
// must keep this for tailwind to generate and hmr arbitrary classes in dev mode (this will be removed in prod)
import "@/assets/index.css";
import "@/assets/cs.css";
// --- [DO NOT REMOVE] ---

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazily } from "react-lazily";

import ExtensionContextInvalidationWatchdog from "@/components/ExtensionContextInvalidationWatchdog";
import CsUiPluginsGuard from "@/components/plugins-guard/CsUiPluginsGuard";
import { PostUpdateReleaseNotesDialog } from "@/components/PostUpdateReleaseNotesDialog";
// import { SponsorHomeLink } from "@/components/SponsorHomeLink";
import { Toaster } from "@/components/Toaster";

const { BetterMessageToolbarsWrapper } = lazily(
  () => import("@/plugins/thread-better-message-toolbars"),
);
const { BetterCodeBlocksWrapper } = lazily(
  () => import("@/plugins/thread-better-code-blocks"),
);
const { ThreadQueryHoverContainerExtraButtonsWrapper } = lazily(
  () => import("@/plugins/_core/ui-groups/thread-query-hover-container"),
);
const { ThreadMessageToolbarExtraButtonsWrapper } = lazily(
  () => import("@/plugins/_core/ui-groups/thread-message-toolbar"),
);
const { CanvasWrapper } = lazily(() => import("@/plugins/canvas"));
const { CommandMenuWrapper } = lazily(() => import("@/plugins/command-menu"));
const { ExportThreadWrapper } = lazily(() => import("@/plugins/export-thread"));
const { HomepageUpdateAnnouncer } = lazily(
  () => import("@/components/HomepageUpdateAnnouncer"),
);
const { ImageGenModelSelectorWrapper } = lazily(
  () => import("@/plugins/image-gen-popover"),
);
const { OnCloudflareTimeout } = lazily(
  () => import("@/plugins/on-cf-timeout-auto-reload"),
);
const { QueryBoxWrapper } = lazily(
  () => import("@/plugins/_core/ui-groups/query-box"),
);
const { SettingsDashboardLink } = lazily(
  () => import("@/components/SettingsDashboardLink"),
);
const { SpaceCardsWrapper } = lazily(
  () => import("@/plugins/space-navigator/spaces-page"),
);
const { SpaceNavigatorWrapper } = lazily(
  () => import("@/plugins/space-navigator/sidebar-content"),
);
const { ThreadTocWrapper } = lazily(() => import("@/plugins/thread-toc"));
const { SidebarToggleableRecentThreadsWrapper } = lazily(
  () => import("@/plugins/sidebar-toggleable-recent-threads"),
);

export default function CsUiRoot() {
  return (
    <>
      <CsUiPluginsGuard browser={["chrome"]}>
        <ExtensionContextInvalidationWatchdog />
      </CsUiPluginsGuard>
      <CsUiPluginsGuard
        desktopOnly
        additionalCheck={({ settings }) =>
          settings.showPostUpdateReleaseNotesPopup &&
          !settings.isPostUpdateReleaseNotesPopupDismissed
        }
      >
        <PostUpdateReleaseNotesDialog />
      </CsUiPluginsGuard>
      <CsUiPluginsGuard location={["home"]}>
        <HomepageUpdateAnnouncer />
        {/* <SponsorHomeLink /> */}
      </CsUiPluginsGuard>
      <QueryBoxWrapper />
      <CsUiPluginsGuard dependentPluginIds={["commandMenu"]}>
        <CommandMenuWrapper />
      </CsUiPluginsGuard>
      <CsUiPluginsGuard>
        <SidebarComponents />
      </CsUiPluginsGuard>
      <CsUiPluginsGuard location={["thread"]}>
        <ThreadComponents />
      </CsUiPluginsGuard>
      <CsUiPluginsGuard
        desktopOnly
        requiresLoggedIn
        location={["collections_page"]}
      >
        <SpaceCardsWrapper />
      </CsUiPluginsGuard>
      <CsUiPluginsGuard dependentPluginIds={["onCloudflareTimeoutAutoReload"]}>
        <OnCloudflareTimeout />
      </CsUiPluginsGuard>

      <CsUiPluginsGuard location={["settings"]}>
        <SettingsDashboardLink />
      </CsUiPluginsGuard>

      <Toaster />
      <ReactQueryDevtools />
    </>
  );
}

function ThreadComponents() {
  return (
    <>
      <CsUiPluginsGuard
        desktopOnly
        allowedAccountTypes={[["pro"], ["pro", "enterprise"]]}
        dependentPluginIds={["imageGenModelSelector"]}
      >
        <ImageGenModelSelectorWrapper />
      </CsUiPluginsGuard>

      <CsUiPluginsGuard dependentPluginIds={["thread:betterMessageToolbars"]}>
        <BetterMessageToolbarsWrapper />
      </CsUiPluginsGuard>

      <CsUiPluginsGuard desktopOnly dependentPluginIds={["thread:canvas"]}>
        <CanvasWrapper />
      </CsUiPluginsGuard>

      <CsUiPluginsGuard dependentPluginIds={["thread:betterCodeBlocks"]}>
        <BetterCodeBlocksWrapper />
      </CsUiPluginsGuard>

      <ThreadQueryHoverContainerExtraButtonsWrapper />

      <ThreadMessageToolbarExtraButtonsWrapper />

      <CsUiPluginsGuard dependentPluginIds={["thread:toc"]}>
        <ThreadTocWrapper />
      </CsUiPluginsGuard>
      <CsUiPluginsGuard dependentPluginIds={["thread:exportThread"]}>
        <ExportThreadWrapper />
      </CsUiPluginsGuard>
    </>
  );
}

function SidebarComponents() {
  return (
    <>
      <CsUiPluginsGuard
        desktopOnly
        requiresLoggedIn
        allowIncognito={false}
        dependentPluginIds={["spaceNavigator"]}
      >
        <SpaceNavigatorWrapper />
      </CsUiPluginsGuard>
      <CsUiPluginsGuard
        dependentPluginIds={["sidebar:toggleableRecentThreads"]}
      >
        <SidebarToggleableRecentThreadsWrapper />
      </CsUiPluginsGuard>
    </>
  );
}

export const csUiRootCss =
  (await import("@/assets/index.css?inline")).default +
  (await import("@/assets/cs.css?inline")).default;
