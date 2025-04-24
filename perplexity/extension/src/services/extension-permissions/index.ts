import { queryClient } from "@/data/query-client";
import { extensionPermissionsQueries } from "@/services/extension-permissions/query-keys";

export class ExtensionPermissionsService {
  static setupReactiveListeners() {
    chrome.permissions.onAdded.addListener((_permission) => {
      queryClient.invalidateQueries({
        queryKey: extensionPermissionsQueries.permissions.all(),
      });
    });

    chrome.permissions.onRemoved.addListener((_permission) => {
      queryClient.invalidateQueries({
        queryKey: extensionPermissionsQueries.permissions.all(),
      });
    });
  }
}
