import "@/assets/index.css";
import "@/assets/extension.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { lazily } from "react-lazily";
import { RouterProvider } from "react-router-dom";

import { APP_CONFIG } from "@/app.config";
import { Toaster } from "@/components/Toaster";
import { initializeDayjsLocale } from "@/data/dayjs";
import { initializeI18next } from "@/data/i18next";
import { queryClient } from "@/data/query-client";
import { setupOptionPageListeners } from "@/entrypoints/options-page/listeners";
import { extensionSettingsQueries } from "@/services/extension-settings/query-keys";

const { CdnRemoteResourcesInvalidator } = lazily(
  () => import("@/components/CdnRemoteResourcesInvalidator"),
);

(async () => {
  await Promise.all([
    initializeI18next(),
    initializeDayjsLocale(),
    queryClient.prefetchQuery(extensionSettingsQueries.detail()),
  ]);

  setupOptionPageListeners();

  const [{ router }] = await Promise.all([
    import("@/entrypoints/options-page/router"),
  ]);

  ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
        <Toaster />
      </I18nextProvider>
      {APP_CONFIG.CPLX_CDN_URL != null && (
        <Suspense>
          <CdnRemoteResourcesInvalidator />
        </Suspense>
      )}
      <ReactQueryDevtools />
    </QueryClientProvider>,
  );
})();
