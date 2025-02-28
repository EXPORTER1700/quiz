import { FC, ReactNode } from "react";
import { IntlProvider } from "react-intl";

import { useLocale } from "@src/config/intl/hooks/useLocale.tsx";
import { messages } from "@src/config/intl/messages";

type AppIntlProviderProps = {
  children: ReactNode;
};

export const AppIntlProvider: FC<AppIntlProviderProps> = (props) => {
  const { children } = props;

  const { locale } = useLocale();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};
