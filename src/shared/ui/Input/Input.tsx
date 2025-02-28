import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";

import classes from "@src/shared/ui/Input/Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isError?: boolean;
};

export const Input: FC<InputProps> = (props) => {
  const { isError, className, ...otherProps } = props;

  return (
    <input
      className={classNames(className, classes.input, {
        [classes.error]: isError,
      })}
      {...otherProps}
    />
  );
};
