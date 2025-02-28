import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

import { LocalStorageKeys } from "@src/config/localStorage/enums/local-storage-keys.enum.ts";
import { Routes } from "@src/config/routing/routes.ts";
import { QuizStage } from "@src/modules/quiz/enums/quiz-stage.enum.ts";
import { useCurrentStage } from "@src/modules/quiz/hooks/useCurrentStage.tsx";
import classes from "@src/pages/Loading/LoadingPage.module.scss";
import { CircleProgress } from "@src/shared/ui/CircleProgress/CircleProgress.tsx";
import { Typography } from "@src/shared/ui/Typography/Typography.tsx";

export const LoadingPage = () => {
  const navigate = useNavigate();

  useCurrentStage(QuizStage.LOADING);

  const handleNavigateToEmail = () => {
    localStorage.setItem(LocalStorageKeys.STAGE, QuizStage.EMAIL);
    navigate(Routes.EMAIL);
  };

  return (
    <div className={classes.container}>
      <CircleProgress estimatedTime={5000} onEnd={handleNavigateToEmail} />
      <Typography ta={"center"} fw={600} className={classes.caption}>
        <FormattedMessage id={"loading.caption"} />
      </Typography>
    </div>
  );
};
