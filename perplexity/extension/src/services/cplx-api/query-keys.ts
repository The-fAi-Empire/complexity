import { createQueryKeys } from "@lukemorales/query-key-factory";

import { APP_CONFIG } from "@/app.config";
import { cplxApiService } from "@/services/cplx-api";
import type { CplxVersions } from "@/services/cplx-api/cplx-api.types";
import { queryClient } from "@/utils/ts-query-client";

export const cplxApiQueries = createQueryKeys("cplxApi", {
  versions: {
    queryKey: null,
    queryFn: async (): Promise<CplxVersions> => {
      const parsedData = await cplxApiService.fetchVersions();

      const latest =
        APP_CONFIG.BROWSER === "chrome" ? "latest" : "latestFirefox";

      return {
        latest: parsedData[latest],
        changelogEntries: parsedData.changelogEntries,
        canvasInstructionLastUpdated: parsedData.canvasInstructionLastUpdated,
      };
    },
  },
  featureCompat: {
    queryKey: null,
    queryFn: () => cplxApiService.fetchFeatureCompat(),
  },
  remoteLanguageModels: {
    queryKey: null,
    queryFn: () => cplxApiService.fetchLanguageModels(),
  },
  changelog: ({ version }: { version?: string } = {}) => ({
    queryKey: [{ version }],
    queryFn: () => cplxApiService.fetchChangelog({ version }),
  }),
  domSelectors: {
    queryKey: null,
    queryFn: () => cplxApiService.fetchDomSelectors(),
  },
  messageBlocksReactFiberNodePath: {
    queryKey: null,
    queryFn: async () => {
      const resource =
        await cplxApiService.fetchMessageBlocksReactFiberNodePath();

      if (resource.startsWith("<"))
        throw new Error("Failed to fetch remote fiber node path");

      return resource.split(".");
    },
  },
});

queryClient.setQueryDefaults(cplxApiQueries.versions.queryKey, {
  retry: false,
});

queryClient.setQueryDefaults(cplxApiQueries.featureCompat.queryKey, {
  retry: false,
});
