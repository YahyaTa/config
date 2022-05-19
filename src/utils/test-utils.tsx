// import React, { createContext, FC, ReactElement, useEffect, useState } from 'react';
// import { I18nextProvider } from 'react-i18next';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { Provider } from 'react-redux';
// import { createTheme, Theme, ThemeProvider as MatThemeProvider } from '@mui/material/styles';
// import { configureStore } from '@reduxjs/toolkit';
// import { cleanup, render as rtlRender, RenderOptions } from '@testing-library/react';

// import useActivity from 'hooks/useActivity';

// import { BusinessLines } from 'business/types/constenum';
// import WithActivity from 'components/WithActivity/WithActivity';
// import { getDefaultRequestHeaders, getProfiles, setAppConfigForUnitTest } from 'configs/appConfig';
// import { localizationProfileChange } from 'configs/localization';
// import { ActivityDetailProps } from 'containers/type/containers';
// import rootReducer from 'store/reducers';
// import standardTheme from 'themes/standard';

// import i18n from './i18nForTests';

// declare module '@mui/styles/defaultTheme' {
//     // eslint-disable-next-line @typescript-eslint/no-empty-interface
//     interface DefaultTheme extends Theme {}
// }

// // For unit test
// export const hostURL = 'http://20.33.40.147:13111/csc/insurance/';

// /**
//  * Clean after each test
//  */
// afterEach(cleanup);

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             // ✅ turns retries off
//             retry: false
//         }
//     }
// });

// const ParamsContext = createContext({});

// const matMuiTheme = createTheme(standardTheme.theme);
// const requestHeaders: Object = getDefaultRequestHeaders({ userName: 'mock-user', apiKey: 'mock_api_key' });

// export const setAppConfig = () => {
//     setAppConfigForUnitTest({
//         ...requestHeaders,
//         skipLogin: false,
//         profileCode: 'standard_en',
//         hostURL: hostURL,
//         apiHostURL: hostURL,
//         baseRouter_USE_FOR_PUBLIC_URL: '/react-ui/react-standard/',
//         defaultDistributorHRef: 'http://20.33.40.147:13111/csc/insurance/distributors/ID-4KDr3G8B',
//         defaultProductHRef: 'http://20.33.40.147:13111/csc/insurance/references/referential_products/ID-6W54Yo',
//         appTitle: 'DXC GT UI',
//         profiles: {
//             standard_en: {
//                 nls: {
//                     date: {
//                         short: 'dd/MM/yyyy',
//                         long: 'd MMMM yyyy'
//                     },
//                     time: 'h:m:s',
//                     decimalSeparator: '.',
//                     thousandsSeparator: ' ',
//                     decimalFractionDigits: 2,
//                     currencyMask: 'num €',
//                     currencyMaskLong: 'num EUR'
//                 },
//                 themeCode: 'standard',
//                 languageFallback: [],
//                 country: 'US',
//                 label: 'Standard',
//                 language: 'en',
//                 locale: 'en-US'
//             },
//             standard_fr: {
//                 nls: {
//                     date: {
//                         short: 'dd/MM/yyyy',
//                         long: 'd MMMM yyyy'
//                     },
//                     time: 'h:m:s',
//                     decimalSeparator: '.',
//                     thousandsSeparator: ' ',
//                     decimalFractionDigits: 2,
//                     currencyMask: 'num €',
//                     currencyMaskLong: 'num EUR'
//                 },
//                 themeCode: 'standard',
//                 languageFallback: ['en'],
//                 country: 'FR',
//                 label: 'Standard',
//                 language: 'fr',
//                 locale: 'fr-FR'
//             }
//         }
//     });
// };

// setAppConfig();

// /**
//  * Render for testing with Redux store
//  * @param {any} ui Component to renders
//  * @param {any} initialState initialState of the store
//  * @param {any} providerProps contexts params
//  * @param {any} store Store
//  * @param {any} renderOptions Options
//  * @return {any} render
//  */
// function renderWithRedux(
//     ui: any,
//     {
//         initialState,
//         storeLocal = configureStore({ reducer: rootReducer, preloadedState: initialState }),
//         ...renderOptions
//     }: any = {},
//     providerProps = {}
// ) {
//     const Wrapper = ({ children }: any) => (
//         <Provider store={storeLocal}>
//             <ParamsContext.Provider value={{ ...providerProps }}>
//                 <QueryClientProvider client={queryClient}>
//                     <MatThemeProvider theme={matMuiTheme}>{children}</MatThemeProvider>
//                 </QueryClientProvider>
//             </ParamsContext.Provider>
//         </Provider>
//     );

//     return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// const store = configureStore({
//     reducer: rootReducer
// });

// const wrapper = ({ children }: any) => (
//     <Provider store={store}>
//         <QueryClientProvider client={queryClient}>
//             <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
//         </QueryClientProvider>
//     </Provider>
// );

// const AllTheProviders: FC = ({ children }: any) => (
//     <QueryClientProvider client={queryClient}>
//         <I18nextProvider i18n={i18n}>
//             <MatThemeProvider theme={matMuiTheme}>{children}</MatThemeProvider>
//         </I18nextProvider>
//     </QueryClientProvider>
// );

// const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) => rtlRender(ui, { wrapper: AllTheProviders, ...options });

// const renderInActivity = (ui: any, { hRef, renderOptions }: any = {}) => {
//     const activityProps: ActivityDetailProps = {
//         businessLine: BusinessLines.system,
//         hRef: hRef,
//         entityType: 'unittest',
//         mainEntityHRef: hRef,
//         activityCode: 'unittest',
//         mode: 'unittest',
//         title: 'unittest'
//     };

//     const baId = hRef + '_' + Date.now();
//     const profiles = getProfiles();
//     localizationProfileChange(profiles['standard_en']);

//     const StartEndActivity = ({ children }: any) => {
//         // This is used to mount and set current step before the inputs are bind to the step
//         const [isMounted, setIsMounted] = useState(false);

//         useEffect(() => {
//             setIsMounted(true);
//         }, [setIsMounted]);

//         const { startActivity, stopActivity }: any = useActivity();
//         useEffect(() => {
//             startActivity(activityProps);

//             return stopActivity;
//         }, []);

//         return <>{isMounted && children}</>;
//     };

//     const Wrapper = ({ children }: any) => (
//         <WithActivity baId={baId} {...activityProps}>
//             <Provider store={store}>
//                 <AllTheProviders>
//                     <StartEndActivity>{children}</StartEndActivity>{' '}
//                 </AllTheProviders>
//             </Provider>
//         </WithActivity>
//     );
//     return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// };

// // Re-export everything
// export * from '@testing-library/react';
// // Override render method
// export { customRender, renderInActivity, renderWithRedux, wrapper };

export {}