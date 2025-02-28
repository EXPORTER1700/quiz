import { ChangeEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import { LocalStorageKeys } from "@src/config/localStorage/enums/local-storage-keys.enum.ts";
import { Routes } from "@src/config/routing/routes.ts";
import { QuizStage } from "@src/modules/quiz/enums/quiz-stage.enum.ts";
import { useCurrentStage } from "@src/modules/quiz/hooks/useCurrentStage.tsx";
import classes from "@src/pages/Email/EmailPage.module.scss";
import { EMAIL_REGEX } from "@src/shared/consts/regex.ts";
import { Button } from "@src/shared/ui/Button/Button.tsx";
import { Input } from "@src/shared/ui/Input/Input.tsx";
import { TypographyColor } from "@src/shared/ui/Typography/enums/typography-color.enum.ts";
import { Typography } from "@src/shared/ui/Typography/Typography.tsx";

export const EmailPage = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  useCurrentStage(QuizStage.EMAIL);

  const [email, setEmail] = useState(
    () => localStorage.getItem(LocalStorageKeys.EMAIL) || "",
  );
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsEmailValid(EMAIL_REGEX.test(event.target.value));
  };

  const goToNextPage = () => {
    localStorage.setItem(LocalStorageKeys.STAGE, QuizStage.COMPLETED);
    localStorage.setItem(LocalStorageKeys.EMAIL, email);
    navigate(Routes.COMPLETED);
  };

  return (
    <div className={classes.container}>
      <Typography fz={30} lh={38} fw={900} className={classes.title}>
        <FormattedMessage id={"email.title"} />
      </Typography>
      <Typography
        fz={15}
        lh={22}
        fw={500}
        color={TypographyColor.SECONDARY}
        className={classes.description}
      >
        <FormattedMessage id={"email.description"} />
      </Typography>
      <Input
        className={classes.input}
        placeholder={intl.formatMessage({ id: "email.input_placeholder" })}
        value={email}
        onChange={handleChangeEmail}
        isError={!isEmailValid}
        type={"email"}
      />
      <Typography
        fz={12}
        lh={18}
        fw={500}
        className={classes.serviceRules}
        ta={"center"}
      >
        <FormattedMessage
          id={"email.service_rules"}
          values={{
            highlighted: ([value]) => (
              <Typography
                key={value as string}
                fz={12}
                lh={18}
                fw={500}
                color={TypographyColor.APP_PRIMARY}
                component={"span"}
              >
                {value}
              </Typography>
            ),
          }}
        />
      </Typography>
      <Button disabled={!isEmailValid} onClick={goToNextPage}>
        <FormattedMessage id={"button.next"} />
      </Button>
    </div>
  );
};
