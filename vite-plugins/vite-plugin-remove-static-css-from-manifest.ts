/* eslint-disable @limegrass/import-alias/import-alias */
import fs from "fs";

import { Plugin } from "vite";

import { createLogger } from "./logger";

export default function viteRemoveStaticCssFromManifest(): Plugin {
  const logger = createLogger("remove-static-css-from-manifest", false);

  return {
    name: "vite-plugin-remove-static-css-from-manifest",
    apply: "build",
    closeBundle: {
      sequential: true,
      order: "post",
      handler() {
        const manifestPath = "./dist/manifest.json";

        if (!fs.existsSync(manifestPath)) {
          logger.warn(
            "Manifest file not found. Skipping removeStaticCssFromManifest.",
          );
          return;
        }

        try {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

          // Remove CSS entries from content scripts
          if (manifest.content_scripts != null) {
            manifest.content_scripts = manifest.content_scripts.map(
              (script: any) => {
                const { css, ...rest } = script;
                return rest;
              },
            );
          }

          fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
          logger.success(
            "Removed static CSS files from manifest.json content scripts",
          );
        } catch (error) {
          logger.error(`Error removing CSS files from manifest.json: ${error}`);
        }
      },
    },
  };
}
