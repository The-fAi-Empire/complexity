import { APP_CONFIG } from "@/app.config";
import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import type { DomSelectors } from "@/data/dom-selectors-registry/types";
import { PluginRegistry } from "@/data/plugin-registry";
import { PplxLanguageModel } from "@/data/plugins/query-box/language-model-selector/language-models";
import type { LanguageModel } from "@/data/plugins/query-box/language-model-selector/language-models.types";
import { localFiberNodePath } from "@/plugins/_core/main-world/react-vdom/actions/get-messages";
import type {
  CplxVersionsApiResponse,
  FeatureCompatibility,
} from "@/services/cplx-api/cplx-api.types";

export class CplxApiOfflineService {
  async fetchVersions(): Promise<CplxVersionsApiResponse> {
    return {
      changelogEntries: [],
      latest: APP_CONFIG.VERSION,
      latestFirefox: APP_CONFIG.VERSION,
      canvasInstructionLastUpdated: Date.now(),
    };
  }

  async fetchFeatureCompat(): Promise<FeatureCompatibility> {
    return Object.fromEntries(
      Object.keys(PluginRegistry.manifests).map((key) => [
        key,
        APP_CONFIG.VERSION,
      ]),
    );
  }

  async fetchLanguageModels(): Promise<LanguageModel[]> {
    return PplxLanguageModel.localModels as unknown as LanguageModel[];
  }

  async fetchChangelog({ version: _ }: { version?: string } = {}) {
    return "";
  }

  async fetchDomSelectors(): Promise<DomSelectors> {
    return DomSelectorsRegistry.local;
  }

  async fetchMessageBlocksReactFiberNodePath() {
    return localFiberNodePath.join(".");
  }
}
