import { FC } from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import classes from "@src/modules/quiz/components/QuizGrid/QuizGrid.module.scss";
import { TGridOption } from "@src/modules/quiz/types/grid-option.type.ts";
import { Typography } from "@src/shared/ui/Typography/Typography.tsx";

type QuizGridProps = {
  options: TGridOption[];
  onSelect: (optionId: number) => void;
  answers: Record<number, boolean>;
};

export const QuizGrid: FC<QuizGridProps> = (props) => {
  const { options, onSelect, answers } = props;

  const handleSelect = (id: number) => {
    return () => onSelect(id);
  };

  return (
    <ul className={classes.list}>
      {options.map((option) => (
        <li
          key={option.id}
          className={classNames(classes.item, {
            [classes.selected]: answers[option.id],
          })}
          onClick={handleSelect(option.id)}
        >
          <span className={classes.emoji}>{option.emoji}</span>
          <Typography fz={15} lh={20} fw={600}>
            <FormattedMessage id={option.text} />
          </Typography>
        </li>
      ))}
    </ul>
  );
};
