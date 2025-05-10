import { createHashRouter } from "react-router-dom";

import { betterSearchParamsRouterRoute } from "@/plugins/better-search-params/route";
import { canvasPrePromptInstallationDialogRouterRoute } from "@/plugins/canvas/components/PrePromptInstallationDialog";

export const createRouter = () =>
  createHashRouter([
    {
      path: "/",
      element: null,
      children: [
        betterSearchParamsRouterRoute,
        canvasPrePromptInstallationDialogRouterRoute,
      ],
      errorElement: null,
    },
    {
      path: "*",
      element: null,
      errorElement: null,
    },
  ]);
