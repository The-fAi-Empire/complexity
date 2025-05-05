import { createRequire } from "module";
import gulp from "gulp";
import gulpZip from "gulp-zip";
import process from "process";

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

function zip() {
  const zipFileName = `${versionToString(packageJson.version)}-${process.env.VITE_TARGET_BROWSER}.zip`;

  return gulp
    .src(`dist/${process.env.VITE_TARGET_BROWSER}/**`, {
      encoding: false,
    })
    .pipe(gulpZip(zipFileName))
    .pipe(gulp.dest("release"));
}

function versionToString(version) {
  if ("prerelease" in packageJson && packageJson.prerelease) {
    return `${version}-prerelease.${packageJson.prerelease}`;
  }

  return version;
}

const createPackage = gulp.series(zip);

export { createPackage };
