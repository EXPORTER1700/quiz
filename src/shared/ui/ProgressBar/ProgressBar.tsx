import { FC } from "react";
import classNames from "classnames";

import classes from "@src/shared/ui/ProgressBar/ProgressBar.module.scss";

type ProgressBarProps = {
  steps: number;
  currentStep: number;
  className?: string;
};

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { currentStep, steps, className } = props;

  const fillerWidthPercent = (currentStep / steps) * 100;

  return (
    <div className={classNames(className, classes.container)}>
      <div
        className={classes.progressBar}
        style={{ width: `${fillerWidthPercent}%` }}
      />
    </div>
  );
};
