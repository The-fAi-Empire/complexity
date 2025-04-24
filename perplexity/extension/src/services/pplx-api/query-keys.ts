import { queryOptions } from "@tanstack/react-query";

import { PplxApiService } from "@/services/pplx-api";
import type { Space } from "@/services/pplx-api/pplx-api.types";

export const pplxApiQueries = {
  all: () => ["pplxApi"] as const,

  userSettings: {
    all: () => [...pplxApiQueries.all(), "userSettings"] as const,
    detail: () =>
      queryOptions({
        queryKey: [...pplxApiQueries.userSettings.all()] as const,
        queryFn: () => PplxApiService.fetchUserSettings(),
      }),
  },

  auth: {
    all: () => [...pplxApiQueries.all(), "auth"] as const,
    detail: () =>
      queryOptions({
        queryKey: [...pplxApiQueries.auth.all()] as const,
        queryFn: () => PplxApiService.fetchAuthSession(),
      }),
    orgStatus: {
      all: () => [...pplxApiQueries.auth.all(), "orgStatus"] as const,
      detail: () =>
        queryOptions({
          queryKey: [...pplxApiQueries.auth.orgStatus.all()] as const,
          queryFn: () => PplxApiService.fetchOrgSettings(),
        }),
    },
  },

  threadInfo: {
    all: () => [...pplxApiQueries.all(), "threadInfo"] as const,
    detail: (threadSlug: string) =>
      queryOptions({
        queryKey: [...pplxApiQueries.threadInfo.all(), { threadSlug }] as const,
        queryFn: () => PplxApiService.fetchThreadInfo(threadSlug),
      }),
  },

  threadsSearch: {
    all: () => [...pplxApiQueries.all(), "threadsSearch"] as const,
    detail: (
      params: { searchValue?: string; limit?: number; offset?: number } = {},
    ) =>
      queryOptions({
        queryKey: [...pplxApiQueries.threadsSearch.all(), params] as const,
        queryFn: () => PplxApiService.fetchThreads(params),
      }),
  },

  spaces: {
    all: () => [...pplxApiQueries.all(), "spaces"] as const,
    detail: () =>
      queryOptions({
        queryKey: [...pplxApiQueries.spaces.all()] as const,
        queryFn: () => PplxApiService.fetchSpaces(),
      }),
    files: {
      all: (spaceUuid: Space["uuid"]) =>
        [...pplxApiQueries.spaces.all(), "files", { spaceUuid }] as const,
      detail: (spaceUuid: Space["uuid"]) =>
        queryOptions({
          queryKey: [...pplxApiQueries.spaces.files.all(spaceUuid)] as const,
          queryFn: () => PplxApiService.fetchSpaceFiles(spaceUuid),
        }),
      downloadUrl: {
        all: (spaceUuid: Space["uuid"], fileUuid: string) =>
          [
            ...pplxApiQueries.spaces.files.all(spaceUuid),
            "downloadUrl",
            { fileUuid },
          ] as const,
        detail: (spaceUuid: Space["uuid"], fileUuid: string) =>
          queryOptions({
            queryKey: [
              ...pplxApiQueries.spaces.files.downloadUrl.all(
                spaceUuid,
                fileUuid,
              ),
            ] as const,
            queryFn: () =>
              PplxApiService.fetchSpaceFileDownloadUrl({ spaceUuid, fileUuid }),
          }),
      },
    },
    threads: {
      all: (spaceSlug: Space["slug"]) =>
        [...pplxApiQueries.spaces.all(), "threads", { spaceSlug }] as const,
      detail: (spaceSlug: Space["slug"]) =>
        queryOptions({
          queryKey: [...pplxApiQueries.spaces.threads.all(spaceSlug)] as const,
          queryFn: () => PplxApiService.fetchSpaceThreads(spaceSlug),
        }),
    },
  },
};
