import "@/lib/i18n";

import { type ReactNode, useEffect } from "react";

import i18n from "@/lib/i18n";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    const updateHtmlAttrs = () => {
      document.documentElement.lang = i18n.language;
      document.title = i18n.t("app.title");
    };

    updateHtmlAttrs();
    i18n.on("languageChanged", updateHtmlAttrs);

    return () => {
      i18n.off("languageChanged", updateHtmlAttrs);
    };
  }, []);

  return <>{children}</>;
}
