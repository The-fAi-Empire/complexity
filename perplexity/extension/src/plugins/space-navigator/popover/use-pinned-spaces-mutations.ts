import { useMutation } from "@tanstack/react-query";

import type { PinnedSpace } from "@/data/plugins/space-navigator/pinned-space.types";
import { queryClient } from "@/data/query-client";
import { getPinnedSpacesService } from "@/services/indexed-db/pinned-spaces";
import { pinnedSpacesQueries } from "@/services/indexed-db/pinned-spaces/query-keys";

export function usePinSpaceMutation() {
  return useMutation({
    mutationKey: ["pinSpaceToSidebar"],
    mutationFn: async ({ uuid }: { uuid: PinnedSpace["uuid"] }) => {
      return await getPinnedSpacesService().add({
        uuid,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: pinnedSpacesQueries.list.all(),
        exact: true,
      });
    },
  });
}

export function useUnpinSpaceMutation() {
  return useMutation({
    mutationKey: ["unpinSpaceFromSidebar"],
    mutationFn: async ({ uuid }: { uuid: PinnedSpace["uuid"] }) => {
      return await getPinnedSpacesService().delete(uuid);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: pinnedSpacesQueries.list.all(),
        exact: true,
      });
    },
  });
}
