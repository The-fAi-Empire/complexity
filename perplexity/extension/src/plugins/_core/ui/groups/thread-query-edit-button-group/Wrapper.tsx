import { lazily } from "react-lazily";

import { withPluginsGuard } from "@/plugins/_core/plugins-guard/withPluginsGuard";
import { shouldEnableUiGroup } from "@/plugins/_core/ui/groups/utils";

const { ThreadQueryEditButtonGroupExtraButtons } = lazily(
  () =>
    import("@/plugins/_core/ui/groups/thread-query-edit-button-group/Group"),
);

const ThreadQueryEditButtonGroupExtraButtonsWrapper = withPluginsGuard(
  ThreadQueryEditButtonGroupExtraButtons,
  {
    additionalCheck: () =>
      shouldEnableUiGroup({
        uiGroup: "thread:messageBlocks:queryEditButtonGroup",
      }),
  },
);

export default ThreadQueryEditButtonGroupExtraButtonsWrapper;
