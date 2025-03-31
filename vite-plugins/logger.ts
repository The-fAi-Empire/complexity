import chalk from "chalk";

export class PluginLogger {
  /** Plugin name prefix for log messages */
  private prefix: string;
  private isVerbose: boolean;

  constructor(pluginName: string, isVerbose: boolean = false) {
    this.prefix = chalk.bold.blue(`vite-plugin-${pluginName}`);
    this.isVerbose = isVerbose;
  }

  /** Log a generic message */
  log(message: string): void {
    console.log(`${this.prefix} ${message}`);
  }

  /** Log an informational message */
  info(message: string): void {
    console.log(`${this.prefix} ${chalk.blue("•")} ${message}`);
  }

  /** Log a success message */
  success(message: string): void {
    console.log(`${this.prefix} ${chalk.green("✓")} ${message}`);
  }

  /** Log a warning message */
  warn(message: string): void {
    console.log(`${this.prefix} ${chalk.yellow("⚠")} ${message}`);
  }

  /** Log an error message */
  error(message: string): void {
    console.error(`${this.prefix} ${chalk.red("✗")} ${message}`);
  }

  /** Log a detail message (indented, for supplementary info) */
  detail(message: string): void {
    console.log(`${this.prefix}   ${chalk.gray("→")} ${message}`);
  }

  /** Log a verbose message - only shown when verbose is enabled */
  verbose(message: string): void {
    if (this.isVerbose) {
      console.log(`${this.prefix} ${chalk.gray("•")} ${chalk.gray(message)}`);
    }
  }

  /** Set verbose mode */
  setVerbose(isVerbose: boolean): void {
    this.isVerbose = isVerbose;
  }
}

/** Create a new logger instance for a plugin */
export function createLogger(
  pluginName: string,
  isVerbose: boolean = false,
): PluginLogger {
  return new PluginLogger(pluginName, isVerbose);
}
