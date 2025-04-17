import { createQueryKeys } from "@lukemorales/query-key-factory";

import { APP_CONFIG } from "@/app.config";
import { CplxApiService } from "@/services/cplx-api";
import type { CplxVersions } from "@/services/cplx-api/cplx-api.types";
import { queryClient } from "@/utils/ts-query-client";

export const cplxApiQueries = createQueryKeys("cplxApi", {
  versions: {
    queryKey: null,
    queryFn: async (): Promise<CplxVersions> => {
      const parsedData = await CplxApiService.fetchVersions();

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
    queryFn: CplxApiService.fetchFeatureCompat,
  },
  remoteLanguageModels: {
    queryKey: null,
    queryFn: CplxApiService.fetchLanguageModels,
  },
  changelog: ({ version }: { version?: string } = {}) => ({
    queryKey: [{ version }],
    queryFn: () => CplxApiService.fetchChangelog({ version }),
  }),
});

queryClient.setQueryDefaults(cplxApiQueries.versions.queryKey, {
  retry: false,
});

queryClient.setQueryDefaults(cplxApiQueries.featureCompat.queryKey, {
  retry: false,
});
