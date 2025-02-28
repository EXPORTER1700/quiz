import { FC } from "react";
import classNames from "classnames";

import classes from "@src/shared/ui/Checkbox/Checkbox.module.scss";

type CheckboxProps = {
  checked: boolean;
};

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { checked } = props;

  return (
    <div
      className={classNames(classes.checkbox, { [classes.checked]: checked })}
    />
  );
};
