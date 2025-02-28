import { FC } from "react";
import { FormattedMessage } from "react-intl";

import classes from "@src/modules/quiz/components/QuizList/QuizList.module.scss";
import { TListOption } from "@src/modules/quiz/types/list-option.type.ts";
import { Checkbox } from "@src/shared/ui/Checkbox/Checkbox.tsx";
import { Typography } from "@src/shared/ui/Typography/Typography.tsx";

type QuizListProps = {
  options: TListOption[];
  onSelect: (optionId: number) => void;
  isMultiple: boolean;
  answers: Record<number, boolean>;
};

export const QuizList: FC<QuizListProps> = (props) => {
  const { onSelect, isMultiple, options, answers } = props;

  const handleSelect = (id: number) => {
    return () => onSelect(id);
  };

  return (
    <ul className={classes.list}>
      {options.map((option) => (
        <li
          key={option.id}
          onClick={handleSelect(option.id)}
          className={classes.item}
        >
          <Typography>
            <FormattedMessage id={option.text} />
          </Typography>
          {isMultiple && <Checkbox checked={answers[option.id]} />}
        </li>
      ))}
    </ul>
  );
};
