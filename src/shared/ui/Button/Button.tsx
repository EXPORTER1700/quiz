import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import classNames from "classnames";

import classes from "@src/shared/ui/Button/Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = (props) => {
  const { disabled, children, className, ...otherProps } = props;

  return (
    <button
      disabled={disabled}
      className={classNames(className, classes.button)}
      {...otherProps}
    >
      {children}
    </button>
  );
};
