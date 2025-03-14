import CsUiPluginsGuard from "@/components/plugins-guard/CsUiPluginsGuard";
import { Portal } from "@/components/ui/portal";
import { useInsertCss } from "@/hooks/useInsertCss";
import normalizeCss from "@/plugins/_core/ui-groups/thread-query-hover-container/normalize.css?inline";
import { useCreatePortalContainers } from "@/plugins/_core/ui-groups/thread-query-hover-container/useCreatePortalContainers";
import QueryMetrics from "@/plugins/thread-message-length/QueryMetrics";
export default function ThreadQueryHoverContainerExtraButtonsWrapper() {
  const portalContainers = useCreatePortalContainers();

  useInsertCss({
    css: normalizeCss,
    id: "thread-query-hover-container-normalize",
  });

  return portalContainers.map((portalContainer, messageBlockIndex) => (
    <Portal key={messageBlockIndex} container={portalContainer as HTMLElement}>
      <div className="x:flex x:h-full x:items-center">
        <CsUiPluginsGuard dependentPluginIds={["thread:showMessageLength"]}>
          <QueryMetrics messageBlockIndex={messageBlockIndex} />
          <Divider />
        </CsUiPluginsGuard>
      </div>
    </Portal>
  ));
}

function Divider() {
  return (
    <div className="m-[1.5px] w-px border-r border-borderMain/50 ring-borderMain/50 divide-borderMain/50 dark:divide-borderMainDark/50 dark:ring-borderMainDark/50 dark:border-borderMainDark/50 bg-transparent x:h-[21px]" />
  );
}
