import { createRequire } from "module";
import gulp from "gulp";
import gulpZip from "gulp-zip";
import fs from "fs";
import { glob } from "glob";
import * as path from "path";

function zip() {
  const require = createRequire(import.meta.url);
  const manifest = require("./package.json");
  const zipFileName = `${manifest.name.replaceAll(" ", "-")}-${manifest.version}-${process.env.VITE_TARGET_BROWSER}.zip`;

  return gulp
    .src("dist/**")
    .pipe(gulpZip(zipFileName))
    .pipe(gulp.dest("package"));
}

const createPackage = gulp.series(zip);

export { createPackage };
