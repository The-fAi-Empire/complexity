import { cplxApiQueries } from "@/services/cplx-api/query-keys";
import { getRemoteResource } from "@/services/cplx-api/remote-resources/utils";
import { versionsRemoteResourceConfig } from "@/services/cplx-api/remote-resources/versions/index.remote-resources";

export class CplxVersionsService {
  static query = cplxApiQueries.remoteResource.detail({
    resourcePath: versionsRemoteResourceConfig.resourcePath,
    zodSchema: versionsRemoteResourceConfig.zodSchema,
  });

  static async inlineQueryFn() {
    return await getRemoteResource(versionsRemoteResourceConfig);
  }
}
