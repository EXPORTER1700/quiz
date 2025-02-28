import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { LocaleProvider } from "@src/config/intl/contexts/LocaleContext.tsx";
import { AppIntlProvider } from "@src/config/intl/providers/AppIntlProvider.tsx";
import { Layout } from "@src/config/layout/Layout.tsx";
import { router } from "@src/config/routing/router.tsx";

import "@src/config/styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <AppIntlProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </AppIntlProvider>
    </LocaleProvider>
  </StrictMode>,
);
