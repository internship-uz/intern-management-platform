import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  STORAGE_KEY,
  resources,
  type Language,
} from "./config";

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && LANGUAGES.includes(stored)) return stored;
  return DEFAULT_LANGUAGE;
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: "translation",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
  document.documentElement.lang = lng;
});
document.documentElement.lang = i18n.language;

export default i18n;
export {
  LANGUAGES,
  LANGUAGE_OPTIONS,
  DEFAULT_LANGUAGE,
  type Language,
} from "./config";
export { useTranslation } from "react-i18next";
