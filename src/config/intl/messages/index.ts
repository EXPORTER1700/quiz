import { ResolvedIntlConfig } from "@formatjs/intl/src/types";
import { Locale } from "@src/config/intl/enums/locale.enum.ts";
import deMessages from "@src/config/intl/messages/de.json";
import enMessages from "@src/config/intl/messages/en.json";
import esMessages from "@src/config/intl/messages/es.json";
import frMessages from "@src/config/intl/messages/fr.json";

export const messages: Record<Locale, ResolvedIntlConfig["messages"]> = {
  [Locale.EN]: enMessages,
  [Locale.ES]: esMessages,
  [Locale.DE]: deMessages,
  [Locale.FR]: frMessages,
};
