#!/usr/bin/env node

import { exec } from "child_process";
import fs from "fs";
import process from "process";
import { promisify } from "util";
import chalk from "chalk";

import { Logger } from "@complexity/cli-logger";
import { Command } from "commander";
import inquirer from "inquirer";

import packageJson from "../../package.json" assert { type: "json" };
import { getExtensionVersion, md5sum } from "./utils.js";

const LOGGER_NAME = packageJson.name;
const CHANGELOG_DIR = "../changelog";
const FOOTER_TEMPLATE_PATH = "./release-note-footer-template.md";

const logger = new Logger({
  name: LOGGER_NAME,
  printPrefix: false,
});

const program = new Command();

program
  .name("create-release-note")
  .description("Create a release note for the Perplexity browser extension")
  .version(packageJson.version)
  .action(main);

program.parse(process.argv);

async function main() {
  const extVersion = getExtensionVersion({ defaultVersion: packageJson });
  const changelogFile = `${CHANGELOG_DIR}/${extVersion}.md`;

  if (fs.existsSync(changelogFile)) {
    logger.info(
      `Changelog file ${chalk.yellowBright(changelogFile)} already exists`,
    );
  } else {
    fs.writeFileSync(changelogFile, "");
    logger.success(
      `Created empty changelog file ${chalk.yellowBright(changelogFile)}`,
    );
  }

  const { createRelease } = await inquirer.prompt([
    {
      type: "confirm",
      name: "createRelease",
      message: `Commit and push your changes (including the newly created changelog file) before proceeding!\nCreate a new GitHub release for version ${extVersion}?`,
      default: false,
    },
  ]);

  if (createRelease) {
    const tagName = `${packageJson.name}@${extVersion}`;
    const crxPath = `../${extVersion}-chrome.crx`;
    const xpiPath = `../${extVersion}-firefox.xpi`;

    const crxExists = fs.existsSync(crxPath);
    const xpiExists = fs.existsSync(xpiPath);

    let proceedWithRelease = true;

    if (!crxExists || !xpiExists) {
      const missingFiles = [];
      if (!crxExists) missingFiles.push("Chrome extension (CRX)");
      if (!xpiExists) missingFiles.push("Firefox extension (XPI)");

      const { proceed } = await inquirer.prompt([
        {
          type: "confirm",
          name: "proceed",
          message: `The following files are missing: ${missingFiles.join(", ")}. Do you want to proceed with creating the release without them?`,
          default: false,
        },
      ]);

      proceedWithRelease = proceed;
    }

    if (proceedWithRelease) {
      const temptChangelogFile = `${changelogFile}.tmp`;
      const releaseNote = fs.readFileSync(changelogFile, "utf8");

      let footerContent;
      try {
        footerContent = generateFooter(extVersion, crxExists, xpiExists);
      } catch (error) {
        logger.error(`Failed to generate footer: ${error.message}`);
        return;
      }

      fs.writeFileSync(
        temptChangelogFile,
        releaseNote + "\n\n" + footerContent,
      );

      let command = `gh release create "${tagName}" -t "${tagName}" --notes-file ${temptChangelogFile}`;

      if (crxExists) {
        command += ` "${crxPath}"`;
      }

      if (xpiExists) {
        command += ` "${xpiPath}"`;
      }

      const execAsync = promisify(exec);

      try {
        const { stdout } = await execAsync(command);
        console.log(stdout);

        logger.success(`Created release ${chalk.yellowBright(tagName)}`);
        logger.detail(
          `https://github.com/pnd280/complexity/releases/tag/${tagName}`,
        );
      } catch (error) {
        logger.error(`Failed to create GitHub release: ${error.message}`);
        process.exit(1);
      } finally {
        fs.unlinkSync(temptChangelogFile);
      }
    } else {
      logger.info("Release creation cancelled.");
    }
  }
}

function generateFooter(version, crxExists = true, xpiExists = true) {
  try {
    const footerTemplate = fs.readFileSync(FOOTER_TEMPLATE_PATH, "utf8");

    const crxHash = crxExists
      ? md5sum(`../${version}-chrome.crx`)
      : "File not available";
    const xpiHash = xpiExists
      ? md5sum(`../${version}-firefox.xpi`)
      : "File not available";

    return footerTemplate
      .replace("$CRX_HASH", crxHash)
      .replace("$XPI_HASH", xpiHash);
  } catch (error) {
    logger.error(`Failed to generate release note: ${error.message}`);
    throw error;
  }
}
