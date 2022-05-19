import { NLSInterface, ProfileInterface } from './appConfig';

import date_enUS from 'date-fns/locale/en-US';
import date_frFR from 'date-fns/locale/fr';
import { format } from 'date-fns';

const dateLocale: any = { 'en-US': date_enUS, 'fr-FR': date_frFR };
let nls: NLSInterface;
let locale: string;

export var language: any = 'en';

export const getNls = () => nls;
export const getLocale = () => locale;
export const displayDate = (value: any) => format(value, nls?.date?.short, { locale: dateLocale[locale] });
export const displayLongDate = (value: any) => format(value, nls?.date?.long, { locale: dateLocale[locale] });
export const dateFormat = () => nls?.date?.short;
export const displayCurrency = (value: any, fixed?: boolean) => nls?.currencyMask?.replace('num', formatNumber(value, nls, fixed));
export const displayCurrencyLong = (value: any) => nls?.currencyMaskLong?.replace('num', formatNumber(value, nls));
export const displayPercent = (value: any) => formatNumber(value * 100, nls) + ' %';
export const displayDecimal = (value: any) => formatNumber(value, nls);
export const displayNumber = (value: any, fixed?: boolean) => formatNumber(value, nls, fixed);

export const localizationProfileChange = (profile: ProfileInterface) => {
    nls = profile.nls;
    locale = profile.locale;
    language = profile.language;
};

// Instead of using 3rd party library to format number
const formatNumber = (
    number: number,
    { decimalSeparator, decimalFractionDigits = 0, thousandsSeparator = '' }: any,
    fixed = true
) => {
    const dec = number?.toString().split(decimalSeparator)?.[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    const decimalNumber = Number(number).toFixed(len);
    let x = fixed ? Number(number).toFixed(decimalFractionDigits).toString() : decimalNumber.toString();
    if (decimalFractionDigits && decimalSeparator) x = x.replace('.', decimalSeparator);

    return x.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
};
