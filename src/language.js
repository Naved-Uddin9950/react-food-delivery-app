// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import enTranslations from './translations/en/global.json'
import esTranslations from './translations/es/global.json'

// Initialize i18next
i18n
    .use(LanguageDetector) // Detect language from browser settings
    .use(initReactI18next) // Pass i18n instance to react-i18next
    .init({
        resources: {
            en: {
                translation: enTranslations,
            },
            es: {
                translation: esTranslations,
            },
        },
        fallbackLng: 'en', // Default language if detection fails
        interpolation: {
            escapeValue: false, // React already safes from xss
        },
    });

export default i18n;
