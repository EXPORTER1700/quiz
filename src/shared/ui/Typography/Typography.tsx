import { createElement, HTMLAttributes, JSX, ReactNode } from "react";
import classNames from "classnames";
import { Property } from "csstype";

import { TypographyColor } from "@src/shared/ui/Typography/enums/typography-color.enum.ts";
import classes from "@src/shared/ui/Typography/Typography.module.scss";

const colorClasses: Record<TypographyColor, string> = {
  [TypographyColor.PRIMARY]: classes.colorPrimary,
  [TypographyColor.SECONDARY]: classes.colorSecondary,
  [TypographyColor.APP_PRIMARY]: classes.colorAppPrimary,
};

type TypographyProps<T extends keyof JSX.IntrinsicElements> = {
  component?: T;
  children: ReactNode;
  fz?: number;
  lh?: number;
  fw?: number;
  color?: TypographyColor;
  ta?: Property.TextAlign;
} & HTMLAttributes<T>;

export function Typography<T extends keyof JSX.IntrinsicElements>(
  props: TypographyProps<T>,
) {
  const {
    children,
    component: Component = "p",
    className,
    fz = 17,
    lh = 24,
    fw = 400,
    color = TypographyColor.PRIMARY,
    ta = "start",
    style,
    ...otherProps
  } = props;

  return createElement(
    Component,
    {
      className: classNames(className, classes.typography, colorClasses[color]),
      style: {
        fontSize: fz,
        fontWeight: fw,
        lineHeight: `${lh}px`,
        textAlign: ta,
        ...style,
      },
      ...otherProps,
    },
    children,
  );
}
