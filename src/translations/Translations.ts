import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

// Default language if none is detected or specified
const mainLanguage = "ka";

// Function to get the language from local storage or default
function getLanguage(): string {
  const storedLang = localStorage.getItem("lang");
  return storedLang && (storedLang === "ka" || storedLang === "en")
    ? storedLang
    : mainLanguage;
}

i18n
  .use(Backend) // Use HTTP backend to load translations
  .use(initReactI18next)
  .init({
    lng: getLanguage(), // Set the initial language
    fallbackLng: mainLanguage, // Fallback language

    detection: {
      order: ["localStorage", "navigator", "querystring", "cookie"],
      lookupLocalStorage: "lang", // Use "lang" key for detection
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false, // Not needed for React
    },
    backend: {
      loadPath: "https://api.onhome.ge/lang/{{lng}}/global.json", // Path for translation files
    },
  });

export default i18n;
