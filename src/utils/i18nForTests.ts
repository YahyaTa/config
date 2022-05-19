// eslint-disable-next-line filenames/match-exported
import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    interpolation: {
        escapeValue: false // not needed for react!!
    },
    partialBundledLanguages: true,

    resources: { en: { translationsNS: {} } },

    react: {
        useSuspense: false
    }
});

export default i18n;
