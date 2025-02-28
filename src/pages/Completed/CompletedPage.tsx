import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import { LocalStorageKeys } from "@src/config/localStorage/enums/local-storage-keys.enum.ts";
import { Routes } from "@src/config/routing/routes.ts";
import { QUIZ_DATA } from "@src/modules/quiz/consts/quiz-data.const.ts";
import { QuizStage } from "@src/modules/quiz/enums/quiz-stage.enum.ts";
import { useCurrentStage } from "@src/modules/quiz/hooks/useCurrentStage.tsx";
import { generateCsv } from "@src/modules/quiz/utils/generate-csv.util.ts";
import classes from "@src/pages/Completed/CompletedPage.module.scss";
import DownloadIcon from "@src/shared/icons/download.svg?react";
import { Button } from "@src/shared/ui/Button/Button.tsx";
import { Typography } from "@src/shared/ui/Typography/Typography.tsx";
import { buildDynamicPath } from "@src/shared/utils/build-dynamic-path.util.ts";
import { downloadCSV } from "@src/shared/utils/download-csv.util.ts";

export const CompletedPage = () => {
  const intl = useIntl();

  const navigate = useNavigate();

  useCurrentStage(QuizStage.COMPLETED);

  const handleReset = () => {
    localStorage.setItem(LocalStorageKeys.STAGE, QuizStage.QUESTIONNAIRE);
    localStorage.setItem(LocalStorageKeys.QUESTION, String(1));
    localStorage.removeItem(LocalStorageKeys.QUIZ_ANSWERS);
    localStorage.removeItem(LocalStorageKeys.EMAIL);

    navigate(buildDynamicPath(Routes.QUIZ, 1));
  };

  const handleDownloadCsv = () => {
    const csv = generateCsv(
      QUIZ_DATA,
      JSON.parse(localStorage.getItem(LocalStorageKeys.QUIZ_ANSWERS) || "{}"),
      intl.messages as Record<string, string>,
      localStorage.getItem(LocalStorageKeys.EMAIL) || "",
    );

    downloadCSV(csv, `quiz-${Date.now()}.csv`);
  };

  return (
    <div className={classes.container}>
      <Typography ta={"center"} component={"div"} className={classes.title}>
        <FormattedMessage
          id={"completed.title"}
          values={{
            bold: ([v]) => (
              <Typography
                key={v as string}
                fw={700}
                fz={36}
                lh={42}
                ta={"center"}
              >
                {v}
              </Typography>
            ),
          }}
        />
      </Typography>
      <img
        src={"checkmark.png"}
        alt={intl.formatMessage({ id: "completed.checkmark_alt" })}
      />
      <button className={classes.downloadButton} onClick={handleDownloadCsv}>
        <DownloadIcon />
        <Typography fw={600}>
          <FormattedMessage id={"button.download_answers"} />
        </Typography>
      </button>
      <Button onClick={handleReset}>
        <FormattedMessage id={"button.retake_quiz"} />
      </Button>
    </div>
  );
};
