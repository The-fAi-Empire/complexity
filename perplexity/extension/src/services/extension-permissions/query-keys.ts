import { queryOptions } from "@tanstack/react-query";

export const extensionPermissionsQueries = {
  all: () => ["extensionPermissions"] as const,

  permissions: {
    all: () => [...extensionPermissionsQueries.all(), "permissions"] as const,
    detail: () =>
      queryOptions({
        queryKey: [...extensionPermissionsQueries.permissions.all()] as const,
        queryFn: () => chrome.permissions.getAll(),
      }),
  },
};
