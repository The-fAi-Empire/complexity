import { z } from "zod";

import { APP_CONFIG } from "@/app.config";
import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import {
  DomSelectorsSchema,
  type DomSelectors,
} from "@/data/dom-selectors-registry/types";
import type { LanguageModel } from "@/data/plugins/query-box/language-model-selector/language-models.types";
import { LanguageModelSchema } from "@/data/plugins/query-box/language-model-selector/language-models.types";
import type {
  CplxVersions,
  CplxVersionsApiResponse,
  FeatureCompatibility,
} from "@/services/cplx-api/cplx-api.types";
import { CplxVersionsApiResponseSchema } from "@/services/cplx-api/cplx-api.types";
import { cplxApiQueries } from "@/services/cplx-api/query-keys";
import { getTParam } from "@/services/cplx-api/utils";
import { safeMerge } from "@/utils/safe-merge";
import { queryClient } from "@/utils/ts-query-client";
import { fetchTextResource } from "@/utils/utils";

export class CplxApiService {
  async fetchVersions(): Promise<CplxVersionsApiResponse> {
    return CplxVersionsApiResponseSchema.parse(
      JSON.parse(
        await fetchTextResource(
          `${APP_CONFIG.CPLX_CDN_URL}/versions.json?t=${getTParam()}`,
        ),
      ),
    );
  }

  async fetchFeatureCompat(): Promise<FeatureCompatibility> {
    return JSON.parse(
      await fetchTextResource(
        `${APP_CONFIG.CPLX_CDN_URL}/feature-compat.json?t=${getTParam()}`,
      ),
    );
  }

  async fetchLanguageModels(): Promise<LanguageModel[]> {
    return z
      .array(LanguageModelSchema)
      .parse(
        JSON.parse(
          await fetchTextResource(
            `${APP_CONFIG.CPLX_CDN_URL}/language-models.json?t=${getTParam()}`,
          ),
        ),
      );
  }

  async fetchChangelog({ version }: { version?: string } = {}) {
    const targetVersion = version ?? APP_CONFIG.VERSION;

    const versions =
      queryClient.getQueryData<CplxVersions>(
        cplxApiQueries.versions.queryKey,
      ) ?? (await queryClient.fetchQuery(cplxApiQueries.versions));

    const versionUrl =
      version ??
      (versions?.changelogEntries.includes(targetVersion)
        ? targetVersion
        : versions?.latest);

    const resp = await fetch(
      `https://raw.githubusercontent.com/pnd280/complexity/refs/heads/nxt/perplexity/extension/release/changelog/${versionUrl}.md`,
    );

    if (resp.status === 404) {
      throw new Error(`Failed to fetch changelog for version ${versionUrl}.`);
    }

    return resp.text();
  }

  async fetchDomSelectors(): Promise<DomSelectors> {
    return safeMerge(
      DomSelectorsSchema,
      JSON.parse(
        await fetchTextResource(
          `${APP_CONFIG.CPLX_CDN_URL}/dom-selectors.json?t=${getTParam()}`,
        ),
      ),
      DomSelectorsRegistry.local,
    );
  }

  async fetchMessageBlocksReactFiberNodePath() {
    return await fetchTextResource(
      `${APP_CONFIG.CPLX_CDN_URL}/message-blocks-react-fiber-node-path?t=${getTParam()}`,
    );
  }
}
