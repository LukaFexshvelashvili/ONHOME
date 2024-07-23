import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en/global.json";
import ka from "./ka/global.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ka: { translation: ka },
  },
  fallbackLng: "ka",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
