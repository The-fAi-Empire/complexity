# DX

## Environment Setup

### Requirements

- Node.js ^20.9.0
- PNPM package manager
- Any Chromium-based browser (Chrome, Edge, Brave, etc.)
  - **Firefox is NOT supported for running the dev environment**

## Development Workflow

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:

   ```bash
   pnpm dev
   ```

   - At the current size of the project, dev server might take up to 30 seconds to finish transpiling the necessary code for the extension to work.
   - HMR not working? Refer to [HMR Support](./hmr.md).

4. Enable "Developer mode" in your browser
5. Load the extension from the `dist` folder

### Build Process

```bash
# Build for Chrome
pnpm build

# Build for Firefox
pnpm build:firefox

# Build for both browsers and create .zip distribution packages
pnpm zip:both
```

## Developer Tools

### Linting and Formatting

- Prettier TailwindCSS class sorting
- In addition to common TypeScript/React ESLint rules, this project includes some specific rules:
  - Enforces strict null checks ([`@typescript-eslint/strict-boolean-expressions`](https://typescript-eslint.io/rules/strict-boolean-expressions/))
  - Enforces specific filename casing (`PascalCase`, `kebab-case`, `camelCase`)
  - Provides automatic global imports via `unimport` (see [config](../src/types/unimport.config.ts))
  - Enforces import scoping via [`eslint-plugin-boundaries`](https://github.com/javierbrea/eslint-plugin-boundaries) to maintain a clean architecture with clear dependency directions (see [config](../eslint/boundaries.js))

### Development Commands

- `pnpm esl`: Run ESLint
- `pnpm eslq`: Run ESLint but only show errors
- `pnpm eslf`: Run ESLint with auto-fix
- `pnpm fmt`: Format all code with Prettier
- `pnpm clean`: Delete `node_modules` and `dist` directories
- Unit tests with Vitest
  - `pnpm test`: Run tests
  - `pnpm test:ui`: Run tests with UI
- End-to-end tests with Playwright
  - Currently only boilerplate code, working unreliable due to Cloudflare protection

## Editor Experience

### VSCode Integration `.vscode/settings.json`

- File exclusions to keep the explorer clean
- You might want to adjust `typescript.tsserver.maxTsServerMemory` to match your system's specs
- TailwindCSS (v4) IntelliSense support for jQuery's methods
- i18n-ally (`lokalise.i18n-ally`) pre-configured
