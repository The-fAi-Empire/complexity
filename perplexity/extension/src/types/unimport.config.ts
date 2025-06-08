import type { UnimportPluginOptions } from "unimport/unplugin";

import { normalizePath } from "../utils/normalize-path";

const unimportConfig: Partial<UnimportPluginOptions> = {
  dts: "./src/types/unimport.d.ts",
  presets: [
    "react",
    {
      from: "react",
      imports: ["lazy", "use", "createContext", "useDeferredValue", "memo"],
    },
    {
      from: normalizePath("src/utils/js-context-guards.ts"),
      imports: ["onlyMainWorldGuard", "onlyExtensionGuard"],
    },
    {
      from: normalizePath("src/utils/utils.ts"),
      imports: [
        "sleep",
        "isMainWorldContext",
        "isExtensionContext",
        "invariant",
      ],
    },
    {
      from: normalizePath("src/utils/deep-equal.ts"),
      imports: ["deepEqual"],
    },
    {
      from: "@complexity/i18n",
      imports: ["t", "extendT", "Trans", "TransWithPrefix"],
    },
  ],
  imports: [
    {
      name: "default",
      as: "$",
      from: "jquery",
    },
    {
      name: "cn",
      from: normalizePath("src/utils/cn.ts"),
    },
    {
      name: "Key",
      from: "ts-key-enum",
    },
  ],
};

export default unimportConfig;
