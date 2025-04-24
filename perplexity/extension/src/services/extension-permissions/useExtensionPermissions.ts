import { useQuery } from "@tanstack/react-query";

import { queryClient } from "@/data/query-client";
import { extensionPermissionsQueries } from "@/services/extension-permissions/query-keys";

export function useExtensionPermissions() {
  const query = useQuery(extensionPermissionsQueries.permissions.detail());

  const handleGrantPermission = ({
    permissions,
    hostPermissions,
  }: {
    permissions: chrome.runtime.ManifestPermissions[];
    hostPermissions?: string[];
  }) => {
    chrome.permissions
      .request({
        permissions,
        origins: hostPermissions,
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: extensionPermissionsQueries.permissions.all(),
        });
      })
      .catch((error) => {
        alert(`Error granting permissions: ${error}`);
      });
  };

  const handleRevokePermission = ({
    permissions,
    hostPermissions,
  }: {
    permissions: chrome.runtime.ManifestPermissions[];
    hostPermissions?: string[];
  }) => {
    chrome.permissions
      .remove({ permissions, origins: hostPermissions })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: extensionPermissionsQueries.permissions.all(),
        });
      })
      .catch((error) => {
        alert(`Error revoking permissions: ${error}`);
      });
  };

  return { query, handleGrantPermission, handleRevokePermission };
}
