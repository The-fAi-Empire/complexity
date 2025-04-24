import { cplxApiQueries } from "@/services/cplx-api/query-keys";
import { pplxLocalImageModels } from "@/services/cplx-api/remote-resources/pplx-image-models/defaults";
import { imageModelIcons } from "@/services/cplx-api/remote-resources/pplx-image-models/icons";
import { pplxImageModelsResourceConfig } from "@/services/cplx-api/remote-resources/pplx-image-models/index.remote-resources";
import type { ImageModel } from "@/services/cplx-api/remote-resources/pplx-image-models/types";
import { getRemoteResource } from "@/services/cplx-api/remote-resources/utils";

export class PplxImageModelsService {
  static get query() {
    return cplxApiQueries.remoteResource.detail({
      resourcePath: pplxImageModelsResourceConfig.resourcePath,
      zodSchema: pplxImageModelsResourceConfig.zodSchema,
    });
  }

  static inlineQueryFn() {
    return getRemoteResource(pplxImageModelsResourceConfig);
  }

  static localModels = pplxLocalImageModels;

  static allModels: ImageModel[] = [...PplxImageModelsService.localModels];

  static icons = imageModelIcons;
}
