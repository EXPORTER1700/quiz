import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { LocalStorageKeys } from "@src/config/localStorage/enums/local-storage-keys.enum.ts";
import { Routes } from "@src/config/routing/routes.ts";
import { Questionnaire } from "@src/modules/quiz/components/Questionnaire/Questionnaire.tsx";
import { QuizStage } from "@src/modules/quiz/enums/quiz-stage.enum.ts";
import { useCurrentStage } from "@src/modules/quiz/hooks/useCurrentStage.tsx";
import { buildDynamicPath } from "@src/shared/utils/build-dynamic-path.util.ts";

export const QuizPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  useCurrentStage(QuizStage.QUESTIONNAIRE);

  useEffect(() => {
    const currentQuestion = localStorage.getItem(LocalStorageKeys.QUESTION);

    if (!currentQuestion) {
      localStorage.setItem(LocalStorageKeys.QUESTION, String(params.question));

      return;
    }

    if (params.question !== currentQuestion) {
      navigate(buildDynamicPath(Routes.QUIZ, currentQuestion));
    }
  }, []);

  return <Questionnaire question={Number(params.question)} />;
};
