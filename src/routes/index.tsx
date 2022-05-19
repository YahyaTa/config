// /* eslint-disable react/display-name */

// import React, { lazy } from 'react';
// import { Navigate } from 'react-router-dom';

// /**
//  * Children routes for deep links
//  */
// import DeepLinkRoutes from 'deeplinks/DeepLink/DeepLinkRoutes';
// import AppLayout from 'layouts/AppLayout/AppLayout';
// import AuthLayout from 'layouts/AuthLayout/AuthLayout';
// import Error404 from 'views/Errors/Error404/Error404';

// const DeepLink = lazy(() => import(/* webpackChunkName: 'DeepLink' */ 'deeplinks/DeepLink/DeepLink'));
// const Login = lazy(() => import(/* webpackChunkName: 'Login' */ 'views/Login/Login'));
// const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ 'views/SignIn/SignIn'));
// const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ 'views/SignUp/SignUp'));
// const Home = lazy(() => import(/* webpackChunkName: 'Home' */ 'views/Home/Home'));
// const MyDemands = lazy(() => import(/* webpackChunkName: 'MyDemands' */ 'business/demands/MyDemands/MyDemands'));
// const MyBasket = lazy(() => import(/* webpackChunkName: 'MyBasket' */ 'business/basket/MyBasket'));

// /**
//  * An empty component that returns null.
//  * It is used in routes array to render an empty component for route /viewTab.
//  * If there is no component on this route, the route will simply redirect to the /errors/error-404 route.
//  * This is done to override this behavior in this case without affecting other cases.
//  * The AppLayout component has a component that uses react-router-dom's useRouteMatch hook to
//  * show/hide content with div display: block or hidden, if the route is /viewTab.
//  * This is done to avoid component rerender in the case of route change.
//  * @returns {void}
//  */

// // Warning : Components which fetch data directly on application loading has to be in lazy loading to give time to load aConfig

// const routes: any = [
//     {
//         path: '/hf',
//         element: <DeepLink />
//     },
//     {
//         path: 'auth',
//         element: <AuthLayout />,
//         children: [
//             {
//                 index: true,
//                 element: <Navigate replace to={'/auth/login'} />
//             },
//             {
//                 path: 'login',
//                 element: <Login />
//             },
//             {
//                 path: 'signin',
//                 element: <SignIn />
//             },
//             {
//                 path: 'signup',
//                 element: <SignUp />
//             }
//         ]
//     },
//     {
//         path: '*',
//         element: <Error404 />
//     },
//     {
//         path: '/',
//         element: <AppLayout />,
//         children: [
//             {
//                 index: true,
//                 element: <Navigate replace to={'/mydemands'} />
//             },
//             {
//                 path: 'home',
//                 element: <Home />
//             },
//             {
//                 path: 'viewTab',
//                 element: null
//             },
//             {
//                 path: 'mydemands',
//                 element: <MyDemands />
//             },
//             {
//                 path: 'mybasket',
//                 element: <MyBasket />
//             },
//             ...DeepLinkRoutes
//         ]
//     }
// ];

// export default routes;
export {}
