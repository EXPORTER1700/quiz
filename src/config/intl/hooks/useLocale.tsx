import { useContext } from "react";

import { LocaleContext } from "@src/config/intl/contexts/LocaleContext.tsx";

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
