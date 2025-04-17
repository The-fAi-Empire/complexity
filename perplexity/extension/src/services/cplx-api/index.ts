import { APP_CONFIG } from "@/app.config";
import type { LanguageModel } from "@/data/plugins/query-box/language-model-selector/language-models.types";
import { CplxApiCacheService } from "@/services/cplx-api/cache";
import type {
  CplxVersionsApiResponse,
  FeatureCompatibility,
} from "@/services/cplx-api/cplx-api.types";
import { CplxApiOfflineService } from "@/services/cplx-api/offline-service";
import { CplxApiService as CplxApiOnlineService } from "@/services/cplx-api/online-service";
import { isInContentScript } from "@/utils/utils";

export interface CplxApiService {
  fetchVersions(): Promise<CplxVersionsApiResponse>;
  fetchFeatureCompat(): Promise<FeatureCompatibility>;
  fetchLanguageModels(): Promise<LanguageModel[]>;
  fetchChangelog(options?: { version?: string }): Promise<string>;
}

const baseServiceInstance =
  APP_CONFIG.CPLX_CDN_URL != null
    ? new CplxApiOnlineService()
    : new CplxApiOfflineService();

export const CplxApiService: CplxApiService = isInContentScript()
  ? baseServiceInstance
  : new CplxApiCacheService(baseServiceInstance);
