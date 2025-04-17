import { z } from "zod";

import { APP_CONFIG } from "@/app.config";
import type { DomSelectors } from "@/data/dom-selectors-registry/types";
import { DomSelectorsSchema } from "@/data/dom-selectors-registry/types";
import type { LanguageModel } from "@/data/plugins/query-box/language-model-selector/language-models.types";
import { LanguageModelSchema } from "@/data/plugins/query-box/language-model-selector/language-models.types";
import type {
  CplxVersionsApiResponse,
  FeatureCompatibility,
} from "@/services/cplx-api/cplx-api.types";
import { CplxVersionsApiResponseSchema } from "@/services/cplx-api/cplx-api.types";
import { CplxApiOfflineService } from "@/services/cplx-api/offline-service";
import { CplxApiService as CplxApiOnlineService } from "@/services/cplx-api/online-service";
import { fetchWithCache } from "@/services/cplx-api/utils";
import { isInContentScript } from "@/utils/utils";

export interface ICplxApiService {
  fetchVersions(): Promise<CplxVersionsApiResponse>;
  fetchFeatureCompat(): Promise<FeatureCompatibility>;
  fetchLanguageModels(): Promise<LanguageModel[]>;
  fetchChangelog(options?: { version?: string }): Promise<string>;
  fetchDomSelectors(): Promise<DomSelectors>;
  fetchMessageBlocksReactFiberNodePath(): Promise<string>;
}

export class CplxApiService implements ICplxApiService {
  private baseService: ICplxApiService;

  constructor() {
    this.baseService =
      APP_CONFIG.CPLX_CDN_URL != null
        ? new CplxApiOnlineService()
        : new CplxApiOfflineService();
  }

  async fetchVersions(): Promise<CplxVersionsApiResponse> {
    if (!isInContentScript()) {
      return this.baseService.fetchVersions();
    }

    return fetchWithCache({
      cacheKey: "cdnVersionsCache",
      fetchFn: () => this.baseService.fetchVersions(),
      cacheValidator: (data) => CplxVersionsApiResponseSchema.safeParse(data),
    });
  }

  async fetchFeatureCompat(): Promise<FeatureCompatibility> {
    if (!isInContentScript()) {
      return this.baseService.fetchFeatureCompat();
    }

    return fetchWithCache({
      cacheKey: "featureCompatCache",
      fetchFn: () => this.baseService.fetchFeatureCompat(),
      cacheValidator: (data) => ({
        success: data != null,
        data: data as FeatureCompatibility,
      }),
    });
  }

  async fetchLanguageModels(): Promise<LanguageModel[]> {
    if (!isInContentScript()) {
      return this.baseService.fetchLanguageModels();
    }

    return fetchWithCache({
      cacheKey: "remotelanguageModelsCache",
      fetchFn: () => this.baseService.fetchLanguageModels(),
      cacheValidator: (data) => z.array(LanguageModelSchema).safeParse(data),
    });
  }

  async fetchChangelog({
    version,
  }: { version?: string } = {}): Promise<string> {
    return this.baseService.fetchChangelog({ version });
  }

  async fetchDomSelectors(): Promise<DomSelectors> {
    if (!isInContentScript()) {
      return this.baseService.fetchDomSelectors();
    }

    return fetchWithCache({
      cacheKey: "remoteDomSelectorsCache",
      fetchFn: () => this.baseService.fetchDomSelectors(),
      cacheValidator: (data) =>
        DomSelectorsSchema.passthrough().safeParse(data),
    });
  }

  async fetchMessageBlocksReactFiberNodePath(): Promise<string> {
    return fetchWithCache({
      cacheKey: "remoteMessageBlocksReactFiberNodePathCache",
      fetchFn: () => this.baseService.fetchMessageBlocksReactFiberNodePath(),
      cacheValidator: (data) => z.string().safeParse(data),
    });
  }
}

export const cplxApiService = new CplxApiService();
