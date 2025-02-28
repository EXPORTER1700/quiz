import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LocalStorageKeys } from "@src/config/localStorage/enums/local-storage-keys.enum.ts";
import { Routes } from "@src/config/routing/routes.ts";
import { QuizStage } from "@src/modules/quiz/enums/quiz-stage.enum.ts";
import { buildDynamicPath } from "@src/shared/utils/build-dynamic-path.util.ts";

const routeByStage: Record<QuizStage, string> = {
  [QuizStage.QUESTIONNAIRE]: buildDynamicPath(Routes.QUIZ, 1),
  [QuizStage.LOADING]: buildDynamicPath(Routes.LOADING),
  [QuizStage.EMAIL]: buildDynamicPath(Routes.EMAIL),
  [QuizStage.COMPLETED]: buildDynamicPath(Routes.COMPLETED),
};

export const useCurrentStage = (expectedStage: QuizStage) => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentStage =
      (localStorage.getItem(LocalStorageKeys.STAGE) as QuizStage) ||
      QuizStage.QUESTIONNAIRE;

    if (currentStage !== expectedStage) {
      navigate(routeByStage[currentStage]);
    }
  }, []);
};
