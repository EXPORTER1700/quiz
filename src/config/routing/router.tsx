import { createBrowserRouter } from "react-router-dom";

import { Routes } from "@src/config/routing/routes.ts";
import { CompletedPage } from "@src/pages/Completed/CompletedPage.tsx";
import { EmailPage } from "@src/pages/Email/EmailPage.tsx";
import { LoadingPage } from "@src/pages/Loading/LoadingPage.tsx";
import { QuizPage } from "@src/pages/Quiz/QuizPage.tsx";
import { Redirect } from "@src/shared/components/Redirect/Redirect.tsx";
import { buildDynamicPath } from "@src/shared/utils/build-dynamic-path.util.ts";

export const router = createBrowserRouter([
  {
    path: `${Routes.QUIZ}/:question`,
    element: <QuizPage />,
  },
  {
    path: Routes.LOADING,
    element: <LoadingPage />,
  },
  {
    path: Routes.EMAIL,
    element: <EmailPage />,
  },
  {
    path: Routes.COMPLETED,
    element: <CompletedPage />,
  },
  {
    path: "*",
    element: <Redirect to={buildDynamicPath(Routes.QUIZ, 1)} />,
  },
]);
