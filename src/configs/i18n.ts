import { getAllLanguages, getProfiles } from './appConfig';

import backend from 'i18next-http-backend';
import { findAndSaveMissingTranslation } from '../utils/missingTranslations';
import { formatValue } from 'utils/functions';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import isDate from 'date-fns/isDate';
import { logErrorByMessage } from '../utils/system';

export const initializeI18n = (nameSpaces: any) => {
    let allLanguagesFallback: any = {};
    const profiles = getProfiles();

    Object.values(profiles).forEach((profile: any) => {
        allLanguagesFallback[profile.language] = profile.languageFallback;
    });

    const options: any = {
        // Namespace configurations
        ns: nameSpaces, // Namespace
        defaultNS: '_common',

        // Save all missing translations into the localstorage
        saveMissing: false,

        lng: 'en',
        fallbackLng: allLanguagesFallback,
        whitelist: getAllLanguages(),

        interpolation: {
            escapeValue: false, // React already safes from xss
            format: function (value: any, format: any) {
                if (format === 'uppercase') return value && value.toUpperCase();
                if (format) return formatValue(value, format);
                if (isDate(value)) return formatValue(value, 'date');

                return value;
            }
        },

        react: {
            useSuspense: true
        },

        backend: {
            // eslint-disable-next-line no-process-env
            // eslint-disable-next-line no-restricted-globals
            loadPath: location.origin + process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json'
        }
    };

    i18n.use(backend).use(initReactI18next).init(options);
};

export const changeCurrentLanguage = async (newLanguage: string) => {
    await i18n.changeLanguage(newLanguage);
};

// We save all missing translation into the localstorage
i18n.on('missingKey', function (language, ns, ident) {
    findAndSaveMissingTranslation(ns, ident);
    logErrorByMessage('i18nMissingTranslation', { ns, ident, language });
});

export default i18n;
