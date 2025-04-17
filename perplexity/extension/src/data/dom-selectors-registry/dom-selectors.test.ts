import * as fs from "fs";
import * as path from "path";

import { describe, it } from "vitest";

import { DOM_SELECTORS } from "@/data/dom-selectors-registry/dom-selectors";

/**
 * This is a test file that not for testing anything but exports DOM selectors to JSON for the CDN.
 * Vitest will run this during the build process.
 */
describe("DOM selectors", () => {
  it("syncs DOM selectors to JSON file", () => {
    try {
      const rootDir = process.cwd();
      const cdnTemplatePath = path.join(rootDir, "cdn-template");
      const outputPath = path.join(cdnTemplatePath, "dom-selectors.json");

      if (!fs.existsSync(cdnTemplatePath)) {
        console.warn(
          "cdn-template folder does not exist, skipping DOM selectors sync",
        );
        return;
      }

      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }

      fs.writeFileSync(outputPath, JSON.stringify(DOM_SELECTORS));
      console.log("DOM selectors successfully synced to JSON file");
    } catch (error) {
      console.error(`Failed to sync DOM selectors: ${error}`);
      throw error;
    }
  });
});
