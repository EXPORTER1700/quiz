import { FC } from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import classes from "@src/modules/quiz/components/QuizBubble/QuizBubble.module.scss";
import { TBubbleOption } from "@src/modules/quiz/types/bubble-option.type.ts";
import { Typography } from "@src/shared/ui/Typography/Typography.tsx";

type QuizBubbleProps = {
  options: TBubbleOption[];
  onSelect: (optionId: number) => void;
  answers: Record<number, boolean>;
};

export const QuizBubble: FC<QuizBubbleProps> = (props) => {
  const { options, onSelect, answers } = props;

  const handleSelect = (optionId: number) => {
    return () => onSelect(optionId);
  };

  return (
    <div className={classNames(classes.container, "hideScrollbar")}>
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
            <Typography
              fz={12}
              lh={16}
              fw={600}
              ta={"center"}
              className={classes.text}
            >
              <FormattedMessage id={option.text} />
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};
