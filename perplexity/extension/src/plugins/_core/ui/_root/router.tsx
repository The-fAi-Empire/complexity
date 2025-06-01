import { createHashRouter } from "react-router-dom";

import { artifactsPrePromptInstallationDialogRouterRoute } from "@/plugins/artifacts/components/PrePromptInstallationDialog";
import { betterSearchParamsRouterRoute } from "@/plugins/better-search-params/route";

export const createRouter = () =>
  createHashRouter([
    {
      path: "/",
      element: null,
      children: [
        betterSearchParamsRouterRoute,
        artifactsPrePromptInstallationDialogRouterRoute,
      ],
      errorElement: null,
    },
    {
      path: "*",
      element: null,
      errorElement: null,
    },
  ]);
