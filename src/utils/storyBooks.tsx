// /* eslint-disable */
// import { ActivityDetailProps } from 'containers/type/containers';
// import WithActivity from 'components/WithActivity/WithActivity';
// import useActivity from 'hooks/useActivity';
// import { Provider } from 'react-redux';
// import React, { useEffect, useState } from 'react';
// import configStore from 'store/configStore';
// import { BusinessLines } from 'business/types/constenum';

// const WrapActivity = React.memo(
//     ({ baId, children }: any) => {
//         const activityProps: ActivityDetailProps = {
//             businessLine: BusinessLines.system,
//             hRef: baId,
//             entityType: 'storybook',
//             mainEntityHRef: 'http://mock/activity/storybook',
//             activityCode: 'storybook',
//             mode: 'storybook',
//             title: 'storybook'
//         };
//         const StartEndActivity = ({ children }: any) => {
//             //This is used to mount and set current step before the inputs are bind to the step
//             const [isMounted, setIsMounted] = useState(false);

//             useEffect(() => {
//                 setIsMounted(true);
//             }, [setIsMounted]);

//             const { startActivity, stopActivity }: any = useActivity();
//             useEffect(() => {
//                 startActivity(activityProps);

//                 return stopActivity;
//             }, []);

//             return <>{isMounted && children}</>;
//         };

//         return (
//             <WithActivity baId={baId} {...activityProps}>
//                 <StartEndActivity>{children}</StartEndActivity>{' '}
//             </WithActivity>
//         );
//     },
//     () => true
// );

// const { store } = configStore();

// const ProviderRedux = ({ children, store }: any) => <Provider store={store}>{children}</Provider>;

// export const WithReduxActivity = ({ baId, children }: any) => (
//     <ProviderRedux store={store}>
//         <WrapActivity baId={baId}>{children}</WrapActivity>
//     </ProviderRedux>
// );

export {}