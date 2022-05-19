import { language } from './localization';

interface NLSDateFormatInterface {
    // Short date format
    short: string;
    // Long date format
    long: string;
}
export interface NLSInterface {
    // Date format
    date: NLSDateFormatInterface;

    // Time format used for hour
    time: string;

    // Decimal FractionDigits
    decimalFractionDigits: number;

    // Decimal format used on numbers
    decimalSeparator: string;

    // Thousands separator used on numbers/amount
    thousandsSeparator: string;

    // Mask used in amount, rate input
    currencyMask: string;

    // Mask used in amount, rate input
    currencyMaskLong: string;
}
export interface ProfileInterface {
    // Nls country
    country: string;

    // NLS to configure type format
    nls: NLSInterface;

    // Label of the profile
    label: string;

    // Language code
    language: string;

    // Default languages to use in case the word is not find.
    languageFallback: Array<string>;

    // Locale use for long date (day and month)
    locale: string;

    // Theme code to apply
    themeCode: string;
}

export let appConfig: any = {};

// Load configuration from sessionStorage to object memory
export const loadAppConf = (data: any) => {
    // const remoteAppConfJSON: any = sessionStorage.getItem('appConfig');
    const remoteAppConf: any = data;
    if (remoteAppConf) {
        const requestHeaders = getDefaultRequestHeaders(remoteAppConf.config.base);
        appConfig = {
            ...requestHeaders,
            ...remoteAppConf.config.base,
            ...remoteAppConf.businessConfig,
            themes: remoteAppConf.themes,
            apiHostURL: remoteAppConf.config.base.hostURL
        };
        // set title
        setAppTitle(appConfig.appTitle);
    }
};

export const getDefaultRequestHeaders = ({ userName, apiKey }: { userName: string; apiKey: string }) => {
    const defaultHeader = {
        'content-type': 'application/json',
        accept: 'application/vnd.hal+json',
        'accept-language': language.replace('_', '-'),
        'x-auth-username': userName,
        'x-api-key': apiKey
    };
    return {
        defaultHeader,
        multiHostUrlHeader: [],
        modifiedHeaderTag: 'X-GraphTalk-Modified'
    };
};

export const changeUserInApiCall = (user: string) => {
    appConfig.defaultHeader['x-auth-username'] = user;
};

export const refreshLanguageInApiCall = () => {
    if (appConfig.defaultHeader) {
        appConfig.defaultHeader['accept-language'] = language.replace('_', '-');
    }
};

export const getProfiles: any = () => appConfig.profiles;
export const getTabs: any = () => appConfig.tabs;
export const getThemes: any = () => appConfig.themes;

export const getAllLanguages = () => Object.values(appConfig.profiles).map((profile: any) => profile.language);

export const setAppConfigForUnitTest = (givenAppConfig: any) => (appConfig = givenAppConfig);

export const setAppTitle = (title: string) => (document.title = title);
