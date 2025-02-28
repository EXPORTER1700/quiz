import { FC, useEffect, useState } from "react";

import classes from "@src/shared/ui/CircleProgress/CircleProgress.module.scss";
import { Typography } from "@src/shared/ui/Typography/Typography.tsx";

type CircleProgressProps = {
  estimatedTime: number; //ms
  onEnd: () => void;
};

export const CircleProgress: FC<CircleProgressProps> = (props) => {
  const { estimatedTime, onEnd } = props;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number;
    const gapDuration = Math.ceil(estimatedTime / 100);
    let id: number;

    const step = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      const timeDiff = timestamp - start;

      setProgress(() => Math.floor(timeDiff / gapDuration));

      if (timeDiff < estimatedTime) {
        id = requestAnimationFrame(step);
      } else {
        onEnd();
      }
    };

    id = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.middleCircle}></div>
      <div
        className={classes.progressSpinner}
        style={{
          background: `conic-gradient(rgb(228, 34, 156) ${progress}%, rgb(242, 242, 242) ${progress}%)`,
        }}
      ></div>
      <Typography fz={52} lh={60} fw={900} className={classes.progress}>
        {progress}%
      </Typography>
    </div>
  );
};
