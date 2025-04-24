import { useQuery } from "@tanstack/react-query";

import { APP_CONFIG } from "@/app.config";
import useExtensionUpdate from "@/hooks/useExtensionUpdate";
import { PluginsStatesService } from "@/services/plugins-states";
import {
  initializePluginStates,
  updatePluginStatesWithFeatureCompat,
} from "@/services/plugins-states/utils";
import { isInContentScript } from "@/utils/utils";
import { invariant } from "@/utils/utils";

export default function usePluginsStates() {
  invariant(
    !isInContentScript(),
    "usePluginsStates can not be used in content script",
  );

  const { data: featureCompat, isLoading: isFetchingFeatureCompat } = useQuery({
    ...PluginsStatesService.featureCompatQuery,
    retry: false,
  });

  const { latestVersion, isLoading: isLoadingLatestVersion } =
    useExtensionUpdate();

  const pluginsStates = useMemo(
    () =>
      updatePluginStatesWithFeatureCompat(
        initializePluginStates(),
        featureCompat,
        APP_CONFIG.VERSION,
        latestVersion,
      ),
    [featureCompat, latestVersion],
  );

  const isLoading = isFetchingFeatureCompat || isLoadingLatestVersion;

  return {
    pluginsStates,
    isLoading,
  };
}
