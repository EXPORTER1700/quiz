import { FC, ReactNode } from "react";

import classes from "@src/config/layout/Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
