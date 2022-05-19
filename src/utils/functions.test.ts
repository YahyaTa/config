// import * as staticResources from 'assets/staticData/data';
// import { getProfiles } from 'configs/appConfig';
// import { localizationProfileChange } from 'configs/localization';
// import * as functions from 'utils/functions';

// import { setAppConfig } from './test-utils';

// setAppConfig();

// describe('Testing Get Link', () => {
//     it('Non existing parameter, Should return null', () => {
//         const extension = functions.getLink(staticResources.resource, 'extension_list');
//         expect(extension).toBeNull();
//     });

//     it('Existing Value, Should have link as the output', () => {
//         const link = functions.getLink(staticResources.resource, 'contract:extension_list');
//         expect(link).toBe('http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/extension_elements');
//     });
// });

// describe('Testing Function getDescriptionValue', () => {
//     it('Should Return Formatted Title', () => {
//         const response = functions.getDescriptionValue(
//             'to_transfer',
//             'contract:proposition_status',
//             staticResources.contractResponse,
//             'text'
//         );
//         expect(response).toBe('To Transfer');
//     });

//     it('Should Return Formatted Title with type', () => {
//         const response = functions.getDescriptionValue(
//             'text',
//             'contract:proposition_status',
//             staticResources.contractResponse,
//             'text'
//         );
//         expect(response).toBe('text');
//     });

//     it('Should Return empty string', () => {
//         const response = functions.getDescriptionValue(
//             undefined,
//             'contract:proposition_status',
//             staticResources.contractResponse,
//             'text'
//         );
//         expect(response).toBe('');
//     });
// });

// describe('Testing Format Value', () => {
//     beforeEach(() => {
//         const profiles = getProfiles();
//         localizationProfileChange(profiles['standard_en']);
//     });

//     it('Existing Parameter - Date Type, Should Return Formatted Date', () => {
//         const date = new Date('2018-09-22T15:00:00');
//         const today = functions.formatValue(date, 'date');
//         expect(today).toBe('22/09/2018');
//     });

//     it('Existing Parameter - dateLong Type, Should Return Date.max', () => {
//         const date = '9999-99-99';
//         const today = functions.formatValue(date, 'dateLong');
//         expect(today).toBe('99/99/9999');
//     });

//     it('Existing Parameter - dateLong Type, Should Return Date.min', () => {
//         const date = '0000-00-00';
//         const today = functions.formatValue(date, 'dateLong');
//         expect(today).toBe('00/00/0000');
//     });

//     it('Existing Parameter - dateLong Type, Should Return Formatted Date', () => {
//         const date = new Date('2018-09-22T15:00:00');
//         const today = functions.formatValue(date, 'dateLong');
//         expect(today).toBe('22 September 2018');
//     });

//     it('Existing Parameter - Currency Type, Should Return Formatted Currency', () => {
//         const currency = functions.formatValue('100', 'currency');
//         expect(currency).toBe('100.00 €');
//     });

//     it('Existing Parameter - Currency Type Long, Should Return Formatted Currency', () => {
//         const currency = functions.formatValue('100', 'currencyLong');
//         expect(currency).toBe('100.00 EUR');
//     });

//     it('Existing Parameter - percent Type, Should Return Formatted percent', () => {
//         const currency = functions.formatValue('100', 'percent');
//         expect(currency).toBe('100.00 %');
//     });

//     it('Existing Parameter - decimal Type, Should Return Formatted decimal', () => {
//         const currency = functions.formatValue('100', 'decimal');
//         expect(currency).toBe('100.00');
//     });

//     it('Existing Parameter - number Type, Should Return Formatted number', () => {
//         const currency = functions.formatValue('100', 'number');
//         expect(currency).toBe('100.00');
//     });

//     it('Existing Parameter - iban Type, Should Return Formatted iban', () => {
//         const currency = functions.formatValue('FR1420041010050500013002606', 'iban');
//         expect(currency).toBe('FR1420041010050500013002606');
//     });

//     it('Non Existing Parameter Style - text, Should Return Text', () => {
//         const valueUnchanged = 'Text Will Not be converted to Uppercase';
//         const text = functions.formatValue('Text Will Not be converted to Uppercase', 'text');
//         // Since no operation has been performed
//         expect(text).toBe(valueUnchanged);
//     });

//     it('Non Existing Parameter Style - text, Should Return Text as is since there is no style matched', () => {
//         const valueUnchanged = 'Text';
//         const text = functions.formatValue('Text', undefined);
//         // Since no operation has been performed
//         expect(text).toBe(valueUnchanged);
//     });

//     it('Non Existing Parameter Style - text, Should Return default value since there is no style', () => {
//         const valueUnchanged = 'Text';
//         const text = functions.formatValue('Text', 'undefined');
//         // Since no operation has been performed
//         expect(text).toBe(valueUnchanged);
//     });

//     it('formatValue should break', () => {
//         const text = functions.formatValue(undefined, 'uppercase');
//         // Since no operation has been performed
//         expect(text).toBeUndefined();
//     });
// });

// describe('Testing Function getDescriptionValueFromList', () => {
//     it('Title from oneOf Object for the list type object', () => {
//         const response = functions.getDescriptionValueFromList(
//             'anonymity',
//             'items',
//             staticResources.listPropertiesResponse,
//             '_links',
//             'text'
//         );
//         expect(response).toBe('anonymity');
//     });

//     it('the result to be "text"', () => {
//         const response = functions.getDescriptionValueFromList(
//             'text',
//             'items',
//             staticResources.listPropertiesResponse,
//             '_links',
//             'text'
//         );
//         expect(response).toBe('text');
//     });

//     it('should return an empty string', () => {
//         const response = functions.getDescriptionValueFromList(null, 'undefined', null, 'undefined');
//         expect(response).toBe('');
//     });
// });

// describe('Testing Function isResponseConsistent', () => {
//     it('Return Consistency Report picked from Response, Should Return Formatted Date', () => {
//         const resource = functions.isResponseConsistent(staticResources.consistentResource);
//         expect(resource).toBeFalsy();
//     });

//     it('Return Undefined when there is no Consistency Report Status found in resource', () => {
//         const inconsistent = functions.isResponseConsistent(staticResources.inConsistentResource);
//         expect(inconsistent).toBeUndefined();
//     });

//     it('Return Undefined when there is no Consistency Report Status found in resource data', () => {
//         const inconsistent = functions.isResponseConsistent(staticResources.consistentResource.data);
//         expect(inconsistent).toBeFalsy();
//     });
// });

// describe('Testing Function Get Status Report', () => {
//     it('Should Return Status Report', () => {
//         const statusReport = functions.getStatusReport(staticResources.consistentResource.data);
//         expect(statusReport).toHaveProperty('consistent');
//     });
//     it('Should Return Status undefined', () => {
//         const statusReport = functions.getStatusReport(null);
//         expect(statusReport).toBeUndefined();
//     });
// });

// describe('Testing Function getOneOfFromResponse', () => {
//     it('Should Return Array of object with labels and values', () => {
//         const response = functions.getOneOfFromResponse(staticResources.oneOfResource, 'quote:status');
//         expect(response).toStrictEqual(staticResources.oneOfOptionsExpected);
//     });

//     it('Should Return Empty Array, If Not found', () => {
//         const response = functions.getOneOfFromResponse(staticResources.oneOfResource, 'quote:frequency');
//         expect(response).toStrictEqual([]);
//     });
// });

// describe('Testing Function getPropertyOptionsFromTable', () => {
//     it('Should Return Empty Object, If one element found', () => {
//         const options = functions.getPropertyOptionsFromTable(staticResources.oneOptionsResponse);
//         expect(options).toEqual({});
//     });
// });

// describe('Testing Function getLabelOfOneOf', () => {
//     it('Should Return Empty Object, If one element found', () => {
//         const options = functions.getLabelOfOneOf(staticResources.optionsResponse, '_links', 'life');
//         expect(options).toBeUndefined();
//     });
// });

// describe('Testing Function getOneOfFromResponseSchema', () => {
//     it('Should Return an empty array', () => {
//         const options = functions.getOneOfFromResponseSchema({}, 'label');
//         expect(options).toEqual([]);
//     });
// });

// describe('Testing Function getPatchHRef', () => {
//     it('Should Return undefined', () => {
//         const options = functions.getPatchHRef('');
//         expect(options).toBeUndefined();
//     });

//     it('Should Return an href', () => {
//         const options = functions.getPatchHRef(staticResources.resource);
//         expect(options).toBe('http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu');
//     });
// });

// describe('Testing Function isFieldEditable', () => {
//     it('Should Return false on the first case', () => {
//         const options = functions.isFieldEditable(staticResources.resource, 'contract:renewal_date');
//         expect(options[0]).toBeFalsy();
//     });

//     it('Should Return true on the first case', () => {
//         const options = functions.isFieldEditable(staticResources.resource, 'contract:number');
//         expect(options[0]).toBeTruthy();
//     });

//     it('Should Return an array', () => {
//         const res = functions.isFieldEditable(staticResources.resource, 'contract:number');
//         expect(res).toEqual([true, [false, 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu']]);
//     });
// });

// describe('Testing Function isFieldRequired', () => {
//     it('Should Return false', () => {
//         const options = functions.isFieldRequired(staticResources.resource, 'contract:renewal_date');
//         expect(options).toBeFalsy();
//     });
//     it('Should Return undefined', () => {
//         const options = functions.isFieldRequired(staticResources.resource, 'contract:number');
//         expect(options).toBeUndefined();
//     });
// });
export {}