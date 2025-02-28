import { createContext, ReactNode, useState } from "react";

import { Locale } from "@src/config/intl/enums/locale.enum.ts";
import { LocalStorageKeys } from "@src/config/localStorage/enums/local-storage-keys.enum.ts";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const LocaleContext = createContext<LocaleContextType | undefined>(
  undefined,
);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState(
    (localStorage.getItem(LocalStorageKeys.LOCALE) as Locale) || Locale.EN,
  );

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem(LocalStorageKeys.LOCALE, newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};
