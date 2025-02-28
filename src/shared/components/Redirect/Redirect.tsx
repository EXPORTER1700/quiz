import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type RedirectProps = {
  to: string;
};

export const Redirect: FC<RedirectProps> = (props) => {
  const { to } = props;

  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, []);

  return null;
};
