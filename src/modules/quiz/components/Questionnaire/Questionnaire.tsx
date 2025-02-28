import { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";

import { useLocale } from "@src/config/intl/hooks/useLocale.tsx";
import { LocalStorageKeys } from "@src/config/localStorage/enums/local-storage-keys.enum.ts";
import { Routes } from "@src/config/routing/routes.ts";
import classes from "@src/modules/quiz/components/Questionnaire/Questionnaire.module.scss";
import { QUIZ_DATA } from "@src/modules/quiz/consts/quiz-data.const.ts";
import { QuizStage } from "@src/modules/quiz/enums/quiz-stage.enum.ts";
import { TQuizAnswers } from "@src/modules/quiz/types/quiz-answers.type.ts";
import { getQuizComponent } from "@src/modules/quiz/utils/get-quiz-component.util.tsx";
import BackArrowIcon from "@src/shared/icons/back-arrow.svg?react";
import { Button } from "@src/shared/ui/Button/Button.tsx";
import { ProgressBar } from "@src/shared/ui/ProgressBar/ProgressBar.tsx";
import { TypographyColor } from "@src/shared/ui/Typography/enums/typography-color.enum.ts";
import { Typography } from "@src/shared/ui/Typography/Typography.tsx";
import { buildDynamicPath } from "@src/shared/utils/build-dynamic-path.util.ts";

type QuestionnaireProps = {
  question: number;
};

const getInitialAnswers = (): TQuizAnswers => {
  const localStorageAnswers = localStorage.getItem(
    LocalStorageKeys.QUIZ_ANSWERS,
  );

  if (localStorageAnswers) {
    return JSON.parse(localStorageAnswers);
  } else {
    return QUIZ_DATA.reduce<TQuizAnswers>((acc, _, idx) => {
      acc[idx + 1] = {};

      return acc;
    }, {});
  }
};

export const Questionnaire: FC<QuestionnaireProps> = (props) => {
  const { question } = props;

  const navigate = useNavigate();

  const { setLocale } = useLocale();

  const [answers, setAnswers] = useState<TQuizAnswers>(getInitialAnswers);

  const questionData = QUIZ_DATA[question - 1];

  const goToNextPage = () => {
    const isLastAnswer = question === QUIZ_DATA.length;

    if (isLastAnswer) {
      localStorage.setItem(LocalStorageKeys.STAGE, QuizStage.LOADING);
      navigate(Routes.LOADING);
    } else {
      localStorage.setItem(LocalStorageKeys.QUESTION, String(question + 1));
      navigate(buildDynamicPath(Routes.QUIZ, question + 1));
    }
  };

  const goToPrevPage = () => {
    setAnswers((prev) => ({ ...prev, [question]: {}, [question - 1]: {} }));
    localStorage.setItem(LocalStorageKeys.QUESTION, String(question - 1));
    navigate(buildDynamicPath(Routes.QUIZ, question - 1));
  };

  useEffect(() => {
    localStorage.setItem(
      LocalStorageKeys.QUIZ_ANSWERS,
      JSON.stringify(answers),
    );
  }, [answers]);

  const handleSelect = (optionId: number) => {
    if (questionData.languages) {
      const idx = questionData.options.findIndex(({ id }) => id === optionId);

      if (idx !== -1) {
        setLocale(questionData.languages[idx]);
      }
    }

    if (questionData.isMultiple) {
      const isAlreadySelected = answers[question][optionId];

      if (!isAlreadySelected && questionData.limit) {
        const isLimitReached =
          Object.values(answers[question]).filter((v) => v).length ===
          questionData.limit;

        if (isLimitReached) {
          return;
        }
      }

      setAnswers((prev) => ({
        ...prev,
        [question]: {
          ...prev[question],
          [optionId]: !isAlreadySelected,
        },
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [question]: {
          [optionId]: true,
        },
      }));

      goToNextPage();
    }
  };

  const nextDisabled =
    Object.values(answers[question]).filter((v) => v).length <= 1;

  const Component = getQuizComponent(
    questionData,
    handleSelect,
    questionData.isMultiple,
    answers[question],
  );

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        {question !== 1 && (
          <Link
            className={classes.backButton}
            to={buildDynamicPath(Routes.QUIZ, question - 1)}
            onClick={goToPrevPage}
          >
            <BackArrowIcon />
          </Link>
        )}
        <Typography fz={18} lh={20} fw={800}>
          <Typography
            fz={18}
            lh={20}
            fw={800}
            component={"span"}
            color={TypographyColor.APP_PRIMARY}
          >
            {question}
          </Typography>
          /{QUIZ_DATA.length}
        </Typography>
        <ProgressBar steps={QUIZ_DATA.length} currentStep={question} />
      </div>

      <Typography
        fz={28}
        lh={34}
        fw={700}
        ta={"center"}
        className={classes.title}
      >
        <FormattedMessage
          id={questionData.title}
          values={{
            highlighted: ([value]) => (
              <Typography
                key={value as string}
                fz={28}
                lh={34}
                fw={700}
                color={TypographyColor.APP_PRIMARY}
                component={"span"}
              >
                {value}
              </Typography>
            ),
          }}
        />
      </Typography>

      {!!questionData.caption && (
        <Typography
          fz={17}
          fw={400}
          color={TypographyColor.SECONDARY}
          className={classes.caption}
          ta={"center"}
        >
          <FormattedMessage id={questionData.caption} />
        </Typography>
      )}

      {Component}

      {questionData.isMultiple && (
        <Button
          className={classes.nextBtn}
          disabled={nextDisabled}
          onClick={goToNextPage}
        >
          <FormattedMessage id={"button.next"} />
        </Button>
      )}
    </div>
  );
};
