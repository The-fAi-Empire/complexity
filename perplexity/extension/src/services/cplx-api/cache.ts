import { storage } from "@wxt-dev/storage";
import { z } from "zod";

import { LanguageModelSchema } from "@/data/plugins/query-box/language-model-selector/language-models.types";
import type { CplxApiService } from "@/services/cplx-api";
import type { FeatureCompatibility } from "@/services/cplx-api/cplx-api.types";
import { CplxVersionsApiResponseSchema } from "@/services/cplx-api/cplx-api.types";
import { jsonUtils } from "@/utils/utils";

export class CplxApiCacheService {
  private apiService: CplxApiService;

  constructor(apiService: CplxApiService) {
    this.apiService = apiService;
  }

  async fetchVersions() {
    const cache = CplxVersionsApiResponseSchema.safeParse(
      jsonUtils.safeParse(
        (await storage.getItem("local:cdnVersionsCache")) ?? "",
      ),
    );

    const refreshCachePromise = this.apiService
      .fetchVersions()
      .then((data) => {
        if (!cache.success || !deepEqual(cache.data, data)) {
          storage.setItem("local:cdnVersionsCache", JSON.stringify(data));
        }
        return data;
      })
      .catch((error) => {
        if (cache.success) {
          return cache.data;
        }
        throw error;
      });

    if (cache.success) {
      return cache.data;
    }

    return refreshCachePromise;
  }

  async fetchFeatureCompat(): Promise<FeatureCompatibility> {
    const cache = jsonUtils.safeParse(
      (await storage.getItem("local:featureCompatCache")) ?? "",
    ) as FeatureCompatibility | null;

    const refreshCachePromise = this.apiService
      .fetchFeatureCompat()
      .then((data) => {
        if (data != null && !deepEqual(cache, data)) {
          storage.setItem("local:featureCompatCache", JSON.stringify(data));
        }
        return data;
      })
      .catch((error) => {
        if (cache != null) {
          return cache;
        }
        throw error;
      });

    if (cache != null) {
      return cache;
    }

    return refreshCachePromise;
  }

  async fetchLanguageModels() {
    const cache = z
      .array(LanguageModelSchema)
      .safeParse(
        jsonUtils.safeParse(
          (await storage.getItem("local:remotelanguageModelsCache")) ?? "",
        ),
      );

    const refreshCachePromise = this.apiService
      .fetchLanguageModels()
      .then((data) => {
        if (data != null && (!cache.success || !deepEqual(cache.data, data))) {
          storage.setItem(
            "local:remotelanguageModelsCache",
            JSON.stringify(data),
          );
        }
        return data;
      })
      .catch((error) => {
        if (cache.success) {
          return cache.data;
        }
        throw error;
      });

    if (cache.success) {
      return cache.data;
    }

    return refreshCachePromise;
  }

  async fetchChangelog({ version }: { version?: string } = {}) {
    return this.apiService.fetchChangelog({ version });
  }
}
