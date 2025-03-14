import CustomHomeSloganPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content//CustomHomeSlogan";
import ImageGenModelSelectorPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content//ImageGenModelSelector";
import LanguageModelSelectorPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content//LanguageModelSelector";
import NoFileCreationOnPastePluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content//NoFileCreationOnPaste";
import OnCloudflareTimeoutAutoReloadPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content//OnCloudflareTimeoutAutoReload";
import BetterCodeBlocksPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/better-code-blocks/BetterCodeBlocks";
import BetterThreadMessageCopyButtonsPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/BetterThreadMessageCopyButtons";
import BetterThreadMessageToolbarsPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/BetterThreadMessageToolbars";
import BetterThreadRewriteDropdownsPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/BetterThreadRewriteDropdowns";
import CanvasPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/Canvas";
import CommandMenuPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/CommandMenu";
import CustomThreadContainerWidthPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/CustomThreadContainerWidth";
import ExportThreadPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/ExportThread";
import PromptHistoryPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/PromptHistory";
import RawHeadingsPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/RawHeadings";
import SidebarToggleableRecentThreadsPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/SidebarToggleableRecentThreads";
import SlashCommandMenuPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/SlashCommandMenu";
import SpaceNavigatorPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/SpaceNavigator";
import SubmitOnCtrlEnterPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/SubmitOnCtrlEnterPluginDetails";
import ThreadMessageTtsPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/ThreadMessageTts";
import ThreadShowMessageLengthPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/ThreadShowMessageLength";
import ThreadToCPluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/ThreadToC";
import ZenModePluginDetails from "@/entrypoints/options-page/dashboard/pages/plugins/components/plugin-details/content/ZenMode";
import { PluginId } from "@/services/extension-local-storage/plugins.types";

export type PluginPluginDetails = Partial<Record<PluginId, React.ReactNode>>;

export const PLUGIN_DETAILS: PluginPluginDetails = {
  "queryBox:languageModelSelector": <LanguageModelSelectorPluginDetails />,
  "queryBox:slashCommandMenu": <SlashCommandMenuPluginDetails />,
  "queryBox:slashCommandMenu:promptHistory": <PromptHistoryPluginDetails />,
  "queryBox:noFileCreationOnPaste": <NoFileCreationOnPastePluginDetails />,
  "queryBox:submitOnCtrlEnter": <SubmitOnCtrlEnterPluginDetails />,
  "sidebar:toggleableRecentThreads": (
    <SidebarToggleableRecentThreadsPluginDetails />
  ),
  spaceNavigator: <SpaceNavigatorPluginDetails />,
  commandMenu: <CommandMenuPluginDetails />,
  "thread:toc": <ThreadToCPluginDetails />,
  "thread:betterMessageToolbars": <BetterThreadMessageToolbarsPluginDetails />,
  "thread:messageTts": <ThreadMessageTtsPluginDetails />,
  "thread:rawHeadings": <RawHeadingsPluginDetails />,
  "thread:betterCodeBlocks": <BetterCodeBlocksPluginDetails />,
  "thread:canvas": <CanvasPluginDetails />,
  "thread:exportThread": <ExportThreadPluginDetails />,
  "thread:betterRewriteDropdowns": (
    <BetterThreadRewriteDropdownsPluginDetails />
  ),
  "thread:betterMessageCopyButtons": (
    <BetterThreadMessageCopyButtonsPluginDetails />
  ),
  "thread:showMessageLength": <ThreadShowMessageLengthPluginDetails />,
  "thread:customThreadContainerWidth": (
    <CustomThreadContainerWidthPluginDetails />
  ),
  imageGenModelSelector: <ImageGenModelSelectorPluginDetails />,
  onCloudflareTimeoutAutoReload: <OnCloudflareTimeoutAutoReloadPluginDetails />,
  "home:customSlogan": <CustomHomeSloganPluginDetails />,
  zenMode: <ZenModePluginDetails />,
};
