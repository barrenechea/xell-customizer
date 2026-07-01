import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslations from "@/locales/en/translation.json";
import esTranslations from "@/locales/es/translation.json";
import frTranslations from "@/locales/fr/translation.json";
import ptTranslations from "@/locales/pt/translation.json";

const supportedLocales = ["en", "es", "fr", "pt"];

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
      fr: {
        translation: frTranslations,
      },
      pt: {
        translation: ptTranslations,
      },
    },
    fallbackLng: "en",
    supportedLngs: supportedLocales,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "language",
      caches: ["localStorage"],
      convertDetectedLanguage(lng) {
        if (lng.startsWith("es")) return "es";
        if (lng.startsWith("fr")) return "fr";
        if (lng.startsWith("pt")) return "pt";
        return "en";
      },
    },
  });

export default i18n;
