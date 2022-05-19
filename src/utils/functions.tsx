// /* eslint-disable no-process-env */

import React, { lazy, useState } from 'react';
import {
    dateFormat,
    displayCurrency,
    displayCurrencyLong,
    displayDate,
    displayDecimal,
    displayLongDate,
    displayNumber,
    displayPercent,
    getLocale
} from 'configs/localization';
import { format, isValid } from 'date-fns';

import IMask from 'imask';
import { appConfig } from 'configs/appConfig';
import axios from './axios';
import i18n from 'configs/i18n';

// import { StepProps } from 'hooks/useStepperNavigation';









// // Import {logErrorByCode} from 'utils/system';

// /*
//     Categories of functions:
//     1. React components utils - handle React components. Code for quick search - reactUtils
//     2. API utilities - hanlde API calls. Code for quick search - apiUtils
//     3. Dynamic steps utils - handle dynamic steps using the useStepsManager - dynamicStepsUtils
//     4. Formatting and display utilities - handle how data is formatted for user display based on data type, user locale, etc.
//        Code for quick search - formatUtil
//     5. Response utilities - handle XML responses from useQueryResponse. Code for quick search - responseUtil*
//     5.1. Response utilities links - handle _links related methods. Code for quick search - responseUtilLinks
//     5.2. Response utilities oneOf - handle oneOf array related methods. Code for quick search - responseUtilOneOf
//     5.3. Response utilities options - handle options related methods. Code for quick search - responseUtilOptions
//     5.4. Response utilities validation - handle respose data validation. Code for quick search - responseUtilValidation
//     5.5. Response utilities miscellaneous - hadnle various functions. Usually only foind in one component/hook.
//          Code for quick search - responseUtilMisc
// */

// /**
//  * ***********************************************************************************************************
//  * Section React components utils - handle React components. Code for quick search - reactUtils.
//  * Only 1 method exists - LazyBusinessComponent, and it is used only in component ContractCard in location
//  * src\business\common\Contracts\ContractCard\ContractCard.tsx
//  * I am thinking of creating a file src\business\common\Contracts\ContractCard\utils\index.ts and
//  * placing the method there.
//  * ***********************************************************************************************************
//  */

// /**
//  * reactUtils
//  * Used only in ContractCard
//  * Lazy load component by business line and component name.
//  * If no product exists, load common business line component name as default.
//  * @param {string} productType - business line
//  * @param {string} componentName - the name of the component
//  * @returns {Function} the lazy loaded component
//  */
// export const LazyBusinessComponent = (productType: string, componentName: string) => lazy(() => import(
//     /* webpackChunkName: 'business' */ `business/${productType}/components/${componentName}/${componentName}`
// ).catch(
//     () => import(
//         /* webpackChunkName: 'business' */ `business/common/components/${componentName}/${componentName}`
//     )
// )
// );

// /**
//  * ***********************************************************************************************************
//  * Section API utilities - handle API calls. Code for quick search - apiUtils
//  * Only 1 object exists - APIActions, that returns wrappers for axios data handling methods.
//  * I am thinking of making a file src\utils\APIActions.ts and placing it in there
//  * ***********************************************************************************************************
//  */

// /**
//  * apiUtils
//  * Returns the axios API request
//  * @param  {Object} payload Object to send in PATCH & POST request
//  * @param  {string} url Resource URL
//  * @param  {Object} params  Optional parameter pass additional parameter to the request, in case we need change in headers, responseType etc
//  * @param headers
//  * @returns {Promise}
//  */
// export const APIActions = {
//     get: (url: string, params?: { headers?: any }) => axios.get(encodeURI(url), {
//         headers: { ...appConfig.defaultHeader, ...params?.headers },
//         withCredentials: true
//     }),
//     post: (url: string, payload: Object, params?: { headers?: any }) => axios.post(url, payload, {
//         headers: { ...appConfig.defaultHeader, ...params?.headers },
//         withCredentials: true
//     }),
//     patch: (url: string, payload: Object, params?: { headers?: any }) => axios.patch(url, payload, {
//         headers: { ...appConfig.defaultHeader, ...params?.headers },
//         withCredentials: true
//     }),
//     delete: (url: string, params?: { headers?: any }) => axios.delete(url, {
//         headers: { ...appConfig.defaultHeader, ...params?.headers },
//         withCredentials: true
//     }),
//     options: (url: string, params?: { headers?: any }) => axios.options(encodeURI(url), {
//         headers: { ...appConfig.defaultHeader, ...params?.headers },
//         withCredentials: true
//     })
// };

// /**
//  * ***********************************************************************************************************
//  * Section Dynamic steps utils - handle dynamic steps using the useStepsManager
//  * Code for quick search - dynamicStepsUtils
//  * Contains 4 methods. I am thinking of creating a file src\utils\dynamicStepsUtils.ts and
//  * placing the methods there.
//  * ***********************************************************************************************************
//  */

// /**
//  * dynamicStepsUtils
//  * Add a step after another, check if it's not already exist
//  * Used in conjunction with the useStepsManager hook
//  * @param {StepProps[]} steps - steps to modify
//  * @param {string} afterStepCode - step code to add after
//  * @param {StepProps} stepToAdd - step to insert
//  * @returns {StepProps[]} modified steps array
//  */
// export const addStepDynamically = (steps: StepProps[], afterStepCode: string, stepToAdd: StepProps) => {
//     const newSteps = [...steps];
//     const afterStepIndex = steps.findIndex(({ code }) => code === afterStepCode);
//     // check afterStepCode exist AND stepToAdd not already exist after

//     if (afterStepIndex !== -1 && steps[afterStepIndex + 1]?.code !== stepToAdd.code) {
//         newSteps.splice(afterStepIndex + 1, 0, stepToAdd);
//     }
//     // This code make a loop
//     // else {
//     //     newSteps.splice(afterStepIndex + 1, 1, stepToAdd);
//     // }

//     return newSteps;
// };

// /**
//  * dynamicStepsUtils
//  * Remove a step from dynamic steps list.
//  * Used in conjunction with the useStepsManager hook
//  * @param {StepProps[]} steps - dynamic steps to modify
//  * @param {string} stepCodeToRemove - step code to delete
//  * @returns {StepProps[]} modified steps array
//  */
// export const removeStepDynamically = (steps: StepProps[], stepCodeToRemove: string) => [...steps].filter((step) => step.code !== stepCodeToRemove);

// /**
//  * dynamicStepsUtils
//  * Set a useState hook to return initialSteps as default useStepsManager
//  * Used in conjunction with the useStepsManager hook and in component OperationContainer
//  * @param {StepProps[]} initialSteps - dynamic steps to modify
//  * @returns {any[]} modified steps array
//  */
// export const useDefaultStepsManager = (initialSteps: StepProps[]) => useState<StepProps[]>(initialSteps);

// /**
//  * dynamicStepsUtils
//  * This is the new generateStepConfig to use
//  * Used in conjunction with the useStepsManager hook
//  * @param {any} steps - steps object
//  * @param {string} keyPrefix - keyPrefix for translations of step labels
//  * @returns {any[]} final steps generated from step object
//  */
// export const generateStepConfig = (steps: any, keyPrefix: string) => {
//     let inc = 0;
//     const result = [] as any;
//     for (const [code, stepDef] of Object.entries(steps)) {
//         const { componentToImport, options = {} }: any = stepDef;

//         result.push({
//             id: options.id ?? inc++,
//             code: code,
//             label: `${keyPrefix}.${code}`,
//             required: options.required ?? true,
//             isValidationStep: options.isValidationStep ?? false,
//             component: React.lazy(componentToImport)
//         });
//     }
//     return result;
// };

// /**
//  * ***********************************************************************************************************
//  * Section data formatting utils - handle data formatting for display and calculation
//  * Code for quick search - formatUtil
//  * Contains 8 methods.
//  * I am thinking of creating a file src\utils\responseUtils.ts and placing it there in section
//  * ## FORAMTTING ## or creating a separate file src\utils\formattingUtils.ts.
//  * ***********************************************************************************************************
//  */

// /**
//  * formatUtil
//  * Format given value according the given style.
//  * It's based on locale parametrization
//  * @param {any} value Value to format
//  * @param {string  | undefined} style Oneof : currency, percent, decimal, date, dateLong
//  * @param {string  | undefined} option extra option, can be the current currency for example
//  * @return {string | undefined} formatted value | undefined
//  */
// // eslint-disable-next-line
export const formatValue = (value: any, style?: string | undefined, option?: any) => {
    if (value === undefined || value === null) return;

    if (!style) return value;

    switch (style) {
        case 'text':
            return value;

        case 'boolean':
            return value === true ? i18n.t('_common:_shared.yes') : i18n.t('_common:_shared.no');

        case 'currency':
            return displayCurrency(value);

        case 'currencyLong':
            return displayCurrencyLong(value);

        case 'percent':
            return displayPercent(value / 100.0);

        case 'decimal':
            return displayDecimal(value);

        case 'number':
            return displayNumber(value);

        case 'date':
        case 'dateLong':
            if (value === '9999-99-99')
                // Date.max from API
                return '99/99/9999';

            if (value === '0000-00-00')
                // Date.min from API
                return '00/00/0000';

            const date = new Date(value);

            return style === 'date' ? displayDate(date) : displayLongDate(date);
        case 'iban':
            let ibanFormatted;
            if (option?.['iban_format']) {
                ibanFormatted = IMask.pipe(value, {
                    mask: convertToIBANMask(option['iban_format'])
                });
            }
            else ibanFormatted = value;

            return ibanFormatted;
        default: {
            // LogErrorByCode('formatValueStyleNotDefined', {style, value})

            return value;
        }
    }
};

// /**
//  * formatUtil
//  * To capitalize the first letter and replace '_' with ' ' of a string
//  * @param  {string} element the element that you want to capitalize the first letter
//  * @returns {string} Same string but with the first letter in Uppercase
//  */
// export const capitalizeFirstLetterAndRemove_ = (element: string) => {
//     let string = element.charAt(0).toUpperCase() + element.slice(1);
//     string = string.replace(/_/g, ' ');

//     return string;
// };

// /**
//  * formatUtil
//  * Formats a date based on given date format
//  * @param {string} date - raw date string
//  * @param {string} dateFormatting - date format asstring
//  * @returns {string} formatted date
//  */
// export const formatToInputDate = (date: string, dateFormatting: string) => {
//     if (date) {
//         const dateParts = date.split('-');
//         if (dateFormatting === 'MM/dd/yyyy') {
//             return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
//         }
//         else {
//             return dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0];
//         }
//     }
//     else {
//         return '';
//     }
// };

// /**
//  * formatUtil
//  * Try to convert given data to array, if not, return empty array.
//  * Used only in FundsDialogContainer
//  * @param {any} data - initial data to convert
//  * @returns {any[]} returned array
//  */
// export const convertDataToArray = (data: any) => {
//     if (data) {
//         return Array.isArray(data) ? data : [data];
//     }
//     else {
//         return [];
//     }
// };

// /**
//  * formatUtil
//  * Remove properties from an object
//  * @param {string[]} keys - array containing property names to be removed from object
//  * @param {Object} obj - object to format
//  * @returns {Object | false} false if obj isn't an object, formatted object otherwise
//  */
// export const omit = (keys: string[], obj: {} | undefined) => obj && Object.fromEntries(Object.entries(obj).filter(([k]) => !keys?.includes(k)));

// /**
//  * formatUtil
//  * Concatenates s string to an hRef, if hRef is falsy, return empty string
//  * used only in component CoverageContent
//  * @param {string} hRef - hRef to append to
//  * @param {string} additionalString - string to append
//  * @returns {string} resulting string
//  */
// export const getHRefWithString = (hRef: string, additionalString: string) => {
//     if (hRef) return hRef + additionalString;
//     return '';
// };

// /**
//  * formatUtil
//  * Gets the currency symbol for a given currency
//  * used only in component CoverageContent
//  * @param {string} currency - currency code
//  * @returns {string} resulting currency symbol
//  */
// export const getCurrencySymbol = (currency?: string) => {
//     if (!currency) return null;
//     return (0)
//         .toLocaleString(getLocale(), {
//             style: 'currency',
//             currency: currency,
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0
//         })
//         .replace(/\d/g, '')
//         .trim();
// };

// /**
//  * formatUtil
//  * Format code IBAN
//  * @param {*} ibanFormat data from API
//  * @returns {string}  return code IBAN formated
//  */
export const convertToIBANMask = (ibanFormat: string) => ibanFormat.replaceAll('X', '*')?.replaceAll('-', ' ');

// /**
//  * ***********************************************************************************************************
//  * Section response utils for handling _links - handle API response related to _links object
//  * Code for quick search - responseUtilLinks
//  * Contains 5 methods.
//  * I am thinking of creating a file src\utils\responseUtils.ts and placing it there in section ## LINKS ##
//  * or creating a separate file src\utils\responseLinksUtils.ts
//  * Maybe put method getLinkObject in
//  * src\business\savings\Activities\UnsolicitedPaymentActivity\InvestmentOptions\SmoothingPools\utils\index.ts
//  * because it is only used there
//  * ***********************************************************************************************************
//  */

// /**
//  * responseUtilLinks
//  * get the link from useQueryResponse _links
//  * @param {any} response - the response?.data from useQueryResponse
//  * @param {string} linkName - the property of the _links object in response
//  * @returns {any} - the link if present, if not, null
//  */
// export const getLink = (response: any, linkName: string) => {
//     if (response?._links?.[linkName]?.href) {
//         return response._links[linkName].href;
//     }
//     else {
//         return null;
//     }
// };

// /**
//  * responseUtilLinks
//  * So far used only in component SmoothingPools in
//  * src\business\savings\Activities\UnsolicitedPaymentActivity\InvestmentOptions\SmoothingPools\SmoothingPools.tsx,
//  * maybe place in \UnsolicitedPaymentActivity\InvestmentOptions\SmoothingPools\utils\index.ts
//  * @param {any}response the response
//  * @param {string}linkName the property of the link
//  * @returns {array} array of hrefs
//  */
// export const getLinkObject = (response: any, linkName: string) => {
//     if (response?._links?.[linkName]) {
//         if (Array.isArray(response._links[linkName])) return response._links[linkName];
//         return [response._links[linkName]];
//     }
//     else {
//         return null;
//     }
// };

// /**
//  * responseUtilLinks
//  * To get activities list available from an operations request
//  * @param {any} response API response provided from {root}/contract/{contractId}/operations
//  * @param {boolean} [sortByName=false] whether to sort the response by its item.name parameter
//  * @returns {Object} List of the operation available for the current contract, or null if no operation available
//  */
// export const getActivities = (response: any, sortByName = false) => {
//     let activities: any;
//     if (response?.data._links?.item?.length >= 1) {
//         activities = [];
//         response.data['_links']['item'].map((item: any, key: number) => (activities[key] = { ...item }));
//     }
//     else {
//         activities = null;
//     }

//     if (activities !== null && sortByName) {
//         activities = activities.sort((el1: any, el2: any) => {
//             if (el1.name > el2.name) {
//                 return 1;
//             }
//             else if (el1.name < el2.name) {
//                 return -1;
//             }
//             else {
//                 return 0;
//             }
//         });
//     }

//     return activities;
// };

// /**
//  * responseUtilLinks
//  * To get items from collection
//  * @param  {any} response API collection response
//  * @returns {Object} Items array
//  */
// export const getCollectionItems = (response: any) => {
//     let items = [];
//     if (response?._links?.item) {
//         items = JSON.parse(JSON.stringify(response['_links']['item']));
//         if (!Array.isArray(items)) {
//             items = [items];
//         }
//     }

//     return items;
// };

// /**
//  * responseUtilLinks
//  * Get the link related to the method passed in parameter. Ex: We'll get the update link if method = 'PUT'.
//  * @param {*} response Response of the API.
//  * @param {string} method Method we want to find in the links.
//  * @returns {string | undefined} Return the link or undefined.
//  */
// export const getActionLink = (response: any, method: string): string | undefined => {
//     if (response?.['_options']) {
//         const link = response['_options']['links'].find(
//             (item: any) => item.method.toUpperCase() === method.toUpperCase()
//         );

//         return link ? link.href : undefined;
//     }

//     return undefined;
// };

// /**
//  * ***********************************************************************************************************
//  * Section response utils for handling oneOf - handle API response related to oneOf objects.
//  * Code for quick search - responseUtilOneOf
//  * Contains 7 methods.
//  * I am thinking of creating a file src\utils\responseUtils.ts and placing it there in section ## ONEOF ##
//  * or creating a separate file src\utils\responseOneOfUtils.ts
//  * I think that the method getDescriptionFromOneOf can be replaced by ouside files usage with
//  * getValueOfOne, at least in some cases, maybe add optional value parameter to getValueOfOne for full
//  * compatibility?
//  * ***********************************************************************************************************
//  */

// /**
//  * responseUtilOneOf
//  * Helper method for getDescriptionFromOneOf > reduce the Cognitive Complexity of getDescriptionFromOneOf
//  * @param {any} value the oneOf property to check
//  * @param {any[]} array The oneOf array from the response data
//  * @returns {string} value from oneOf array
//  */
// const usefulForGetDescriptionFromOneOf = (value: string, array: []) => {
//     for (let item of array) {
//         if (item['enum'][0] === value) {
//             value = item['title'];
//             return value;
//         }
//     }
// };

// /**
//  * responseUtilOneOf
//  * Return the description from oneOf for given property from given responce data
//  * Maybe replace usage with getValueOfOne method, as it does the same with option data formatting,
//  * but getDescriptionFromOneOf allows for search using a specific value, maybe add optional value to getValueOfOne?
//  * @param {any} value the oneOf property name to check
//  * @param {string} id API response property containing oneOf array
//  * @param {any} response API response data
//  * @returns {string} value from oneOf array
//  */
// export const getDescriptionFromOneOf = (value: string, id: string, response: any) => {
//     if (response?._options?.properties?.[id]?.oneOf) {
//         return usefulForGetDescriptionFromOneOf(value, response?._options?.properties[id]?.oneOf);
//     }

//     if (response?._options?.links[1]?.schema?.properties?.[id]?.oneOf) {
//         return usefulForGetDescriptionFromOneOf(value, response._options.links[1].schema.properties[id].oneOf);
//     }

//     if (response?._options?.properties?._links?.properties?.item?.properties?.summary?.properties?.[id]?.oneOf) {
//         const array = response?._options?.properties?._links?.properties?.item?.properties?.summary?.properties[id];

//         return usefulForGetDescriptionFromOneOf(value, array?.oneOf);
//     }

//     return value;
// };

// /**
//  * responseUtilOneOf
//  * get the value from property, with format, special case for age
//  * @param {any} response - the response?.data from useQueryResponse
//  * @param {string} property - the property of the _links object in response
//  * @param {string} styleType - the property of the _links object in response
//  * @returns {any} - the link if present, if not, null
//  */
// export const getValueOfOne: any = (response: any, property: string, styleType: any[]) => {
//     const value = response?.data?.[property];
//     let resultValue = undefined;
//     if (value) {
//         let notFormattedValue = getDescriptionFromOneOf(response.data[property], property, response.data);

//         if (styleType) {
//             resultValue = formatValue(notFormattedValue, styleType[0], styleType[1]);
//         }
//         else {
//             resultValue = notFormattedValue;
//         }
//     }
//     else {
//         return '';
//     }

//     if (styleType && styleType[0] === 'age') {
//         return i18n.t('_common:_shared.age', { count: resultValue });
//     }
//     else {
//         return resultValue;
//     }
// };

// /**
//  * responseUtilOneOf
//  * Process one of into value-label pair
//  * @param {Array<any>} oneOfArray oneOfArray from response
//  * @returns {enumlist} Array to populate oneof items
//  */
// export const processOneof = (oneOfArray: Array<any>) => {
//     let enumItemList = [];
//     const processedList = [];

//     for (const item of oneOfArray) {
//         // To add check for current lang when picking enum title
//         const isExisting = processedList.filter((array: any) => array.enum === item.enum);
//         if (isExisting.length === 0) {
//             processedList.push(item);
//             enumItemList.push({ value: item?.enum[0], label: item?.title });
//         }
//     }

//     return enumItemList;
// };

// /**
//  * responseUtilOneOf
//  * Get Options for oneOf (select) type field
//  * @param {response} response Response of the HTTP request
//  * @param {id} id ID of the field
//  * @param {object} list List object consisting current list item & List name
//  * @returns {list} Array to populate select dropdown
//  */
// export const getOneOfFromResponse = (response: any, id: string, list?: any) => {
//     let enumItemList: { value: any; label: any }[] = [];
//     if (response?._options?.properties?.[id]?.['oneOf']) {
//         const oneOfArray: Array<any> = response._options.properties[id]['oneOf'];
//         enumItemList = processOneof(oneOfArray);
//     }
//     else if (response?._options?.properties?.['_links']) {
//         const options = getPropertyOptionsFromTable(response);
//         const oneOfArray = options[id]['oneOf'];
//         enumItemList = oneOfArray && processOneof(oneOfArray);
//     }
//     else if (list) {
//         const options = getListProperties(response, list.listName);
//         if (options?.[id]?.['oneOf']) {
//             const oneOfArray: Array<any> = options[id]['oneOf'];
//             enumItemList = processOneof(oneOfArray);
//         }
//     }

//     return enumItemList;
// };

// /**
//  * responseUtilOneOf
//  * Get label of OneOf
//  * @param {Array} array Array of OneOf
//  * @param {string} property property searching
//  * @param {string} value value searching
//  * @returns {string} string | undefined
//  */
// export const getLabelOfOneOf = (array: any, property: string, value: string) => {
//     const result = getOneOfFromResponse(array, property)?.filter((item) => item.value === value);
//     return result?.length > 0 ? result[0].label : undefined;
// };

// /**
//  * responseUtilOneOf
//  * Get Options for oneOf (Select) type field from API Option
//  * based on schema
//  * @param {response} response Response of the HTTP request
//  * @param {id} id ID of the field
//  * @returns {list} Array to populate select dropdown
//  */
// export const getOneOfFromResponseSchema = (response: any, id: string) => {
//     let enumItemList: { value: any; label: any }[] = [];
//     if (response?.schema?.properties?.[id]?.['oneOf']) {
//         const oneOfArray: Array<any> = response.schema.properties[id]['oneOf'];
//         enumItemList = processOneof(oneOfArray);
//     }

//     return enumItemList;
// };

// /**
//  * ***********************************************************************************************************
//  * Section response utils for handling options - handle API response related to options objects.
//  * Code for quick search - responseUtilOptions
//  * Contains 9 methods.
//  * I am thinking of creating a file src\utils\responseUtils.ts and placing it there in section ## OPTIONS ##
//  * or creating a separate file src\utils\responseOptionsUtils.ts.
//  * If making a separate file, getPropertyOptionsFromTable is used in getOneOfFromResponse method
//  * Also, getListProperties is a universal helper method used in many responseUtil methods outside OPTIONS:
//  *  - getOneOfFromResponse
//  *  - isFieldVisible
//  *  - getMinLength
//  *  - getMaxLength
//  *  - getMinValue
//  *  - getMaxValue
//  *  - getPropertyType
//  *
//  * The methods getDescriptionValue and getDescriptionValueFromList should maybe be placed in a separate file
//  * responseGetValueUtils.ts, for example, given their functionality - they return a value from two
//  * possible sources - the first being a oneOf field from options, where they match the property id for the
//  * oneOf field, and the value to the value of one of the oneOf values in array, and get the oneOf title,
//  * the other the value is just the passed value formatted if no oneOf is found.
//  * ***********************************************************************************************************
//  */

// /**
//  * responseUtilOptions / responseUtilUniversalHelper
//  * To get list properties
//  * Is used only in functions in various responseUtil methods and
//  * is not limited to just OPTIONS methods
//  * @param {any} response - the API response data
//  * @param {string} list - the list name
//  * @returns {Object} Items array
//  */
// export const getListProperties = (response: any, list: string) => response?.['_options']?.['properties']?.[list]?.items?.items;

// /**
//  * responseUtilOptions
//  * helper method used in getPropertyOptionsFromTable method
//  * @param {options} options Response of the HTTP request
//  * @returns {mergedOptions} Merge multiple oneOf schema objects
//  */
// const mergeOptions = (options: any) => {
//     let mergedOptions = {};
//     if (options.oneOf.length > 1) {
//         for (const item of options.oneOf) {
//             mergedOptions = { ...mergedOptions, ...item };
//         }
//     }

//     return mergedOptions;
// };

// /**
//  * responseUtilOptions
//  * helper method used in getDescriptionValue responseUtilOptions method and
//  * getOneOfFromResponse responseUtilOneOf method
//  * @param {response} response Response data of the HTTP request
//  * @returns {options} Property Options for Table
//  */
// export const getPropertyOptionsFromTable = (response: any) => {
//     let options;
//     if (response?._options?.properties?._links?.properties?.item?.properties?.summary?.properties) {
//         options = response._options.properties._links.properties.item.properties.summary.properties;
//         options = options?.oneOf ? mergeOptions(options) : options;

//         return options;
//     }
// };

// /**
//  * responseUtilOptions
//  * Method that returns the value (title propery), formatted if needed,
//  * from a oneOf object from table options of the response
//  * Consider exporting to separate file responseGetValueUtils
//  * Also consider similarities between getPropertyOptionsFromTable and getDescriptionFromOneOf -
//  * The if condition here is the same as the third if in getDescriptionFromOneOf
//  * @param {value} value Value of the field
//  * @param {id} id ID of the field whose oneOf should be picked
//  * @param {response} response Response data of the HTTP request
//  * @param {type} type if needs to be formatted to any specific format like date or currency
//  * @returns {options} Title from oneOf Object
//  */
// export const getDescriptionValue = (value: any, id: string, response: any, type?: string) => {
//     const options = getPropertyOptionsFromTable(response);
//     if (options?.[id]?.oneOf) {
//         for (const item of options[id].oneOf) {
//             if (item.enum[0] === value) {
//                 value = item.title;
//             }
//         }
//     }
//     else if (type) {
//         value = formatValue(value, type);
//     }

//     return value ? value : '';
// };

// /**
//  * responseUtilOptions
//  * Method that returns the value (title property), formatted if needed,
//  * from a oneOf object from the list properties of the response
//  * Used only in component ControlDataList and functions.test.ts
//  * Consider exporting to separate file responseGetValueUtils
//  * @param {value} value Value of the field
//  * @param {id} id ID of the field whose oneOf should be picked
//  * @param {response} response Response data of the HTTP request
//  * @param {string} list pass the name of the list from which value needs to be integrated
//  * @param {type} type if needs to be formatted to any specific format like date or currency
//  * @returns {options} Title from oneOf Object for the list type object
//  */
// export const getDescriptionValueFromList = (value: any, id: string, response: any, list: string, type?: string) => {
//     const options = getListProperties(response, list);

//     if (options?.[id]?.oneOf) {
//         for (const item of options[id].oneOf) {
//             if (item.enum[0] === value) {
//                 value = item.title;
//             }
//         }
//     }
//     else if (type) {
//         value = formatValue(value, type);
//     }

//     return value ? value : '';
// };

// /**
//  * responseUtilOptions
//  * Get patch Data from API Option
//  * @param {response} response Response of the HTTP request
//  * @returns {list} Array to populate select dropdown
//  */
// export const getPatchData = (response: any) => {
//     if (response?.['_options']) {
//         return response['_options']['links'].find((item: any) => item.method === 'PATCH');
//     }

//     return null;
// };

// /**
//  * responseUtilOptions
//  * Get patch hRef from response data, similar to getPatchData method
//  * In practice used for setting canEdit boolean flag, so maybe rework it to return a boolean value
//  * and place it as a responseValidationUtils method?
//  * @param {response} response Response of the HTTP request
//  * @returns {string | undefined} patchLink from response
//  */
// export const getPatchHRef = (response: any) => {
//     if (response?.['_options']) {
//         const patchLink = response['_options']['links'].find((item: any) => item.method === 'PATCH');

//         return patchLink?.href;
//     }

//     return undefined;
// };

// /**
//  * responseUtilOptions
//  * Return all options matching given rel
//  * @param {any} response provided response data - response?.data?.['_options']
//  * @param {string} rel provided response
//  * @returns {any} the rel link options
//  */
// export const getRelInOptions = (response: any, rel: string): any => response?.['links'].find((item: any) => item.rel === rel);

// /**
//  * responseUtilOptions
//  * Return true or false if the response contains the requested method (GET, POST, PATCH, etc)
//  * @param {any} response provided response data - response?.data from an HTTP OPTIONS request method
//  * @param {string} method provided response
//  * @returns {boolean} the rel link options
//  */
// export const hasMethodInOptions = (response: any, method: string): boolean => response?.['links']?.find((item: any) => item.method === method);

// /**
//  * ***********************************************************************************************************
//  * Section response utils for handling validation - handle API response related to data validation
//  * Code for quick search - responseUtilValidation
//  * Contains 15 methods.
//  * I am thinking of creating a file src\utils\responseUtils.ts and placing it there in section
//  * ## VALIDATION ## or creating a separate file src\utils\responseUtilsValidation.ts.
//  * Some methods are only used in hook useValidate, maybe create a separate file for just them?
//  * ***********************************************************************************************************
//  */

// /**
//  * responseUtilValidation
//  * checks response consistency
//  * @param {response} response Response of the HTTP request
//  * @returns {consistency} BOOLEAN if consistent or not
//  */
// export const isResponseConsistent = (response: any) => response?._embedded?.['cscaia:status_report']?.consistent;

// /**
//  * responseUtilValidation
//  * Returns response status report
//  * @param {response} response Response of the HTTP request
//  * @returns {report} OBJECT - consist of consistency report and error messages if any
//  */
// export const getStatusReport = (response: any) => response?._embedded?.['cscaia:status_report'];

// /**
//  * responseUtilValidation
//  * Checks if options property is type oneOf
//  * maybe rename to isFieldOneOf?
//  * Only used in hook useValidator
//  * @param {any} response Response of the HTTP request
//  * @param {string} id Response of the HTTP request
//  * @returns {boolean} is field oneOf
//  */
// export const isOneOfField = (response: any, id: string) => !!response?._options?.properties?.[id]?.['oneOf'];

// /**
//  * responseUtilValidation
//  * If POST method is allowed on the current response
//  * @param  {any} response provided response
//  * @returns {boolean} whether the POST operation is available for given response
//  */
// export const isFieldCreatable = (response: any): boolean => {
//     if (response?.['_options']?.['links']) {
//         const postLink = response['_options']['links'].filter((item: any) => item.method === 'POST');
//         return postLink.length !== 0;
//     }

//     return false;
// };

// /**
//  * responseUtilValidation
//  * Check whether a PATCH operation can be performed on the field provided
//  * @param {any} response - provided response
//  * @param {string} field - field which should be checked for edit capability
//  * @param {any} [list] - List object consisting current list item & List name
//  * @returns {[boolean, [boolean, (string | undefined)]]} true, if PATCH operation is available for the provided field, the second value if it's the field is
//  * immediatePatch and the hRef for patching
//  */
// export const isFieldEditable = (response: any, field: string, list?: any): [boolean, [boolean, string | undefined]] => {
//     if (response?.['_options']) {
//         const patchLink = response['_options']['links'].find((item: any) => item.method === 'PATCH');
//         if (!patchLink) {
//             return [false, [false, undefined]];
//         }

//         const immediatePatch =
//             patchLink?.['schema']?.['influencers']?.find((item: any) => item === field) !== undefined;

//         const link = patchLink?.['schema']?.['properties'];

//         if (link?.[field] || (list && link[list.listName].items.items[field])) {
//             return [true, [immediatePatch, patchLink.href]];
//         }
//     }

//     return [false, [false, undefined]];
// };

// /**
//  * responseUtilValidation
//  * Whether the propertyName provided is a required field.
//  * used only in hook useValidator and functions.test.ts
//  * @param  {any} response provided response
//  * @param  {string} field the field/propertyName which should be checked whether required
//  * @returns {boolean} true, if present in required array in API
//  */
// export const isFieldRequired = (response: any, field: string) => response?.['_options']?.['required'] && response['_options']['required'].indexOf(field) !== -1;

// /**
//  * responseUtilValidation
//  * Whether the propertyName provided is available for GET. If avaiable for GET, it should be visible, else not.
//  * @param {any} response provided response
//  * @param {string} field the field/propertyName which should be checked for visibility
//  * @param {object} [list] List object consisting current list item & List name
//  * @returns {boolean} true, if allowed for GET and therefore should be visible on screen
//  */
// export const isFieldVisible = (response: any, field: string, list?: any): boolean => {
//     if (list) {
//         const options = getListProperties(response, list.listName);
//         if (options) return options.hasOwnProperty(field);
//     }

//     return !!response?.['_options']?.['properties']?.[field];
// };

// /**
//  * responseUtilValidation
//  * Fetches allowed minlength from API for a property
//  * used only in hook useValidator
//  * @param {any} response API response provided
//  * @param {string} propertyName concerned propertyName
//  * @param {object} list List object consisting current list item & List name
//  * @returns {number| null} allowed min Length value
//  */
// export const getMinLength = (response: any, propertyName: string, list?: any) => {
//     if (list) {
//         const options = getListProperties(response, list.listName);

//         return options?.[propertyName]?.minLength;
//     }

//     return response?.['_options']?.['properties']?.[propertyName]?.minLength;
// };

// /**
//  * responseUtilValidation
//  * Fetches allowed maxlength from API for a property
//  * @param {any} response API response provided
//  * @param {string} propertyName concerned propertyName
//  * @param {object} list List object consisting current list item & List name
//  * @returns {number| null} allowed maxLength value
//  */
// export const getMaxLength = (response: any, propertyName: string, list?: any) => {
//     if (list) {
//         const options = getListProperties(response, list.listName);

//         return options?.[propertyName]?.maxLength;
//     }

//     return response?.['_options']?.['properties']?.[propertyName]?.maxLength;
// };

// /**
//  * responseUtilValidation
//  * Fetches allowed minimum allowed value from API for a property
//  * used only in hook useValidator
//  * @param {any} response API response provided
//  * @param {string} propertyName concerned propertyName
//  * @param {object} list List object consisting current list item & List name
//  * @returns {number| null} allowed minimum value
//  */
// export const getMinValue = (response: any, propertyName: string, list?: any) => {
//     if (list) {
//         const options = getListProperties(response, list.listName);

//         return options?.[propertyName]?.minimum;
//     }
//     if (response?.['_options']?.['properties']?.[propertyName]?.minimum) {
//         return response['_options']['properties'][propertyName].minimum;
//     }
//     return 0;
// };

// /**
//  * responseUtilValidation
//  * Fetches allowed maximum allowed value from API for a property
//  * used only in hook useValidator
//  * @param  {any} response API response provided
//  * @param  {string} propertyName concerned propertyName
//  * @param {object} list List object consisting current list item & List name
//  * @returns {number| null} allowed maximum value
//  */
// export const getMaxValue = (response: any, propertyName: string, list?: any) => {
//     if (list) {
//         const options = getListProperties(response, list.listName);

//         return options?.[propertyName]?.maximum;
//     }

//     return response?.['_options']?.['properties']?.[propertyName]?.maximum;
// };

// /**
//  * responseUtilValidation
//  * Returns the type of property
//  * used only in hook useValidator
//  * @param {any} response API response provided
//  * @param {string} propertyName concerned propertyName
//  * @param {object} list List object consisting current list item & List name
//  * @returns {string} type like number, array, string etc
//  */
// export const getPropertyType = (response: any, propertyName: string, list?: any) => {
//     if (list) {
//         const options = getListProperties(response, list.listName);

//         return options?.[propertyName]?.type;
//     }

//     return response?.['_options']?.['properties']?.[propertyName]?.type;
// };

// /**
//  * responseUtilValidation
//  * Check if string is a valid date
//  * used only in hook useValidator
//  * @param {string} date - date string
//  * @returns {boolean} is the string a valid date
//  */
// export const isValidDate = (date: string) => {
//     const formatDate = formatToInputDate(date, dateFormat());

//     const parsedDate = format(new Date(formatDate), 'yyyy-MM-dd');

//     return isValid(new Date(parsedDate));
// };

// /**
//  * responseUtilValidation
//  * Get property value from response or list,
//  * return undefined if no property detected
//  * @param {any} data provided response.data
//  * @param {string} propertyName field which should be checked for edit capability
//  * @param {object} list List object consisting current list item & List name
//  * @returns {any} current value of property
//  */
// export const getPropertyValue = (data: any, propertyName: string, list?: any) => {
//     if (list?.[propertyName]) {
//         return list[propertyName];
//     }
//     else return data?.[propertyName];
// };

// /**
//  * responseUtilValidation
//  * Return the object which contains the data for a response, it can be used on collection (response.summary) response on id response (response)
//  * @param {any} response response
//  * @returns {any}  return the data object
//  */
// export const makeUnifiedResponse = (response: any) => {
//     if (!response) return undefined;

//     if (response.summary)
//         return {
//             name: response.name,
//             title: response.title,
//             ...response['summary']
//         };

//     if (response.data)
//         return {
//             name: response.data?._links?.self?.name,
//             title: response.data?._links?.self?.title,
//             ...response.data
//         };
// };

// /**
//  * ***********************************************************************************************************
//  * Section response utils miscellaneous - handle various response issues
//  * Code for quick search - responseUtilMisc
//  * Contains x methods.
//  * I am thinking of creating a file src\utils\responseUtilsMisc.ts and placing it there in section
//  * ## MISCELLANEOUS ## or creating a separate file src\utils\responseUtilsMisc.ts.
//  * All methods are used in just 1 component, maybe place them there?
//  * ***********************************************************************************************************
//  */

// /**
//  * responseUtilMisc
//  * used only in calculateChargesRate method, which is used only in component AllocationSplit
//  * Filter fees regarding the remaining pools
//  * @param {Array} feesList List of fees
//  * @param {Array} pools List of remaining pools
//  * @returns {Array} Return the filtered fees
//  */
// export const filterFeesByRemainingPool = (feesList: any[], pools: any[]): Array<any> => {
//     const filteredFees: any[] = [];
//     pools?.forEach((pool: any) => {
//         if (feesList) {
//             const filteredData = feesList.filter((fee: any) => fee.product_component === pool.product_component);
//             filteredFees.push(...filteredData);
//         }
//     });

//     return filteredFees;
// };

// /**
//  * responseUtilMisc
//  * used only in component AllocationSplit
//  * Calculate the average of all fees rate in parameter
//  * @param {*} response Response data from API
//  * @returns {Number} Return the value of (TotalRate / ManagementTypes).
//  */
// export const calculateChargesRate = (response: any): number => {
//     const { fees_override_list: feesList, main_pool_split } = response || {};
//     const arr = filterFeesByRemainingPool(feesList, main_pool_split);
//     let total = 0;

//     arr.forEach((fee: any) => {
//         total += fee['fees_override:rate'];
//     });

//     if (main_pool_split?.length) return total / main_pool_split?.length;
//     else return 0;
// };

// /**
//  * responseUtilMisc
//  * Get items from API Option
//  * based on schema
//  * used only in component BeneficiaryAccordion
//  * @param {response} response Response of the HTTP request
//  * @param {id} id ID of the field
//  * @returns {list} items
//  */
// export const getSchemaPropertyItems = (response: any, id: string) => {
//     if (response?.schema?.properties?.[id]) {
//         return response.schema.properties[id];
//     }

//     return [];
// };

// /**
//  * responseUtilMisc
//  * used only in component PoolsList
//  * Get the ressource of datas in the array passed in parameter, foundable by the provided property.
//  * @param {Array} data Array of data, which contains hRef of full ressource.
//  * @param {string} property The property to access to the ressource, for each data.
//  * @returns {Array} Return the previous array with _data object containing full ressource.
//  */
// export const getDataRessourceFromArray = async (data: Array<any>, property: string) => {
//     let newData: any[] = [];
//     const promises = data.map(async (item: any) => {
//         const res = await APIActions.get(item[property]);
//         if (res.data) {
//             return res.data;
//         }
//     });

//     await Promise.all(promises).then((arr: any[]) => {
//         newData = arr.map((item: any, index: number) => ({ ...data[index], _data: { ...item } }));
//     });

//     return newData;
// };

// /**
//  * responseUtilMisc
//  * used only in hook useGetPersonRoles
//  * Split array of object into array based on splitBy property (Ex: contract number)
//  * @param {Array} arrayToSplit Response data from API
//  * @param {String} splitBy property to split by
//  * @returns {Array} array contains results
//  */
// export const splitArrayOfRoles = (arrayToSplit: any[], splitBy: string) => {
//     const result: any[] = [];

//     arrayToSplit.forEach((data: any) => {
//         if (data['summary'][splitBy]) {
//             const index = result.findIndex((element) => element[splitBy] === data['summary'][splitBy]);

//             if (index === -1) {
//                 const newObject = {
//                     [splitBy]: data['summary'][splitBy],
//                     elements: [data],
//                     roles: capitalizeFirstLetterAndRemove_(data['summary']['party_role:full_type'])
//                 };
//                 result.push(newObject);
//             }
//             else {
//                 result[index].elements.push(data);
//                 result[index].roles += `, ${capitalizeFirstLetterAndRemove_(data['summary']['party_role:full_type'])}`;
//             }
//         }
//     });

//     return result;
// };

// /**
//  * responseUtilMisc
//  * used only in component ActivityContainer
//  * Return the lock message if it exists in the status report
//  * @param {any} response Response data from API
//  * @returns {any} array contains results
//  */
// export const getLockMessage = (response: any) => {
//     const statusReport = getStatusReport(response) ?? [];
//     return (
//         statusReport.consistent === false &&
//         typeof statusReport?.messages === 'object' &&
//         statusReport?.messages.find((item: any) => item?.code === 'locked_by')
//     );
// };

// /**
//  * check the type of the field and replace the value the right value
//  * @param {string} field - field value
//  * @param {string | number | null | undefined} value - value
//  * @return {string} the value of the field
//  */
// export const valueToUse = (field: any, value: string | number | null | undefined) => {
//     const forBooleanValue = value ? i18n.t('_common:_shared.yes') : i18n.t('_common:_shared.no');

//     if (field.isOneOf) return field.valueLabel;
//     else if (field.type === 'boolean') return forBooleanValue;
//     else return value;
// };
