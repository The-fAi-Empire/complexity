import { expect } from "@playwright/test";

import { DomSelectorsRegistry } from "@/data/dom-selectors-registry";
import { ENDPOINTS } from "@/services/pplx-api/endpoints";
import { E2E_CONFIG } from "~/e2e/config";
import { BasePage } from "~/e2e/pages/base.page";

export class HomePage extends BasePage implements Extracted {
  async load(): Promise<void> {
    await this.navigateTo(ENDPOINTS.HOME);
    await expect(this.page).toHaveTitle(/Perplexity/);
  }

  async verifyKeyElements(): Promise<void> {
    const heading = this.page.locator(
      DomSelectorsRegistry.cachedSync.QUERY_BOX.TEXTAREA.MAIN,
    );
    await expect(heading).toBeVisible({
      timeout: E2E_CONFIG.TIMEOUTS.HEADING_VISIBLE,
    });
  }

  async verifyHomepageLoad(): Promise<void> {
    await this.verifyKeyElements();
  }
}

interface Extracted {
  load(): Promise<void>;
  verifyKeyElements(): Promise<void>;
  verifyHomepageLoad(): Promise<void>;
}
