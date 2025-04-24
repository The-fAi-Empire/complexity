import { APP_CONFIG } from "@/app.config";
import { CplxApiOfflineService } from "@/services/cplx-api/offline-service";
import { CplxApiService as CplxApiOnlineService } from "@/services/cplx-api/online-service";

type CplxApiServiceType = typeof CplxApiOnlineService;

export const CplxApiService: CplxApiServiceType =
  APP_CONFIG.CPLX_CDN_URL != null
    ? CplxApiOnlineService
    : CplxApiOfflineService;
