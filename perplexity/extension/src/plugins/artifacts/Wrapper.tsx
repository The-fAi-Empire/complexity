import { lazily } from "react-lazily";

import { withPluginsGuard } from "@/plugins/_core/plugins-guard/withPluginsGuard";

const { Artifacts } = lazily(() => import("@/plugins/artifacts/Artifacts"));

const ArtifactsWrapper = withPluginsGuard(Artifacts, {
  dependentPluginIds: ["thread:betterCodeBlocks", "thread:artifacts"],
});

export default ArtifactsWrapper;
