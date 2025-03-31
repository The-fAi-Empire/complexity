/* eslint-disable @limegrass/import-alias/import-alias */
import * as fs from "fs";

import { Plugin } from "vite";

import { createLogger } from "./logger";

function touchFile(filePath: string): void {
  const time = new Date();
  fs.utimesSync(filePath, time, time);
}

type TouchGlobalCSSPluginOptions = {
  cssFilePath: string;
  watchFiles: string[];
  verbose?: boolean;
};

export default function touchGlobalCSSPlugin({
  cssFilePath,
  watchFiles,
  verbose = false,
}: TouchGlobalCSSPluginOptions): Plugin {
  const logger = createLogger("touch-global-css", verbose);

  return {
    name: "touch-global-css",
    configureServer(server) {
      logger.verbose(`Plugin initialized, watching ${watchFiles.length} files`);

      server.watcher.on("change", (file) => {
        if (watchFiles.some((watchFile) => file.includes(watchFile))) {
          if (file.includes(cssFilePath)) return;

          touchFile(cssFilePath);
          logger.info(`Touched ${cssFilePath} due to change in ${file}`);
        }
      });
    },
  };
}
