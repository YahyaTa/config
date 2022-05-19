/* eslint-disable no-process-env */

import { appConfig, changeUserInApiCall } from '../../configs/appConfig';

export interface callbackProp {
    (canLogged: boolean): any;
}

export const signUp = () => () => null;

export const signIn = async (userName: string, fetch: any, callback?: callbackProp) => {
    changeUserInApiCall(userName);
    const checkUserExistHref = `${appConfig.apiHostURL}references_wm/users?user:user_name=${userName}`;

    await fetch(encodeURI(checkUserExistHref)).then((response: any) => {
        if (response?.data._links?.item?.href) {
            const userDetailHref = response.data._links.item.href;

            return fetch(encodeURI(userDetailHref)).then((userDetailResponse: any) => {
                if (userDetailResponse?.data) {
                    const userDetail = {
                        e_mail: userDetailResponse.data['user:e_mail'],
                        first_name: userDetailResponse.data['user:first_name'],
                        name: userDetailResponse.data['user:name'],
                        phone_number: userDetailResponse.data['user:phone_number'],
                        profile_list: userDetailResponse.data['user:profile_list'],
                        security_profile_list: userDetailResponse.data['user:security_profile_list'],
                        situation_code: userDetailResponse.data['user:situation_code'],
                        supervisor_workqueue_list: userDetailResponse.data['user:supervisor_workqueue_list'],
                        user_name: userDetailResponse.data['user:user_name'],
                        validity_end_date: userDetailResponse.data['user:validity_end_date'],
                        validity_start_date: userDetailResponse.data['user:validity_start_date'],
                        workqueue_list: userDetailResponse.data['user:workqueue_list'],
                        active_session_id: userDetailResponse.data['active_session_id'],
                        active_session_name: userDetailResponse.data['active_session_name'],
                        sessionHref: userDetailResponse.data._links?.['cscaia:sessions']?.href,
                        activeSessionHref: userDetailResponse.data._links?.['cscaia:active_session']?.href
                    };

                    localStorage.setItem('userData', JSON.stringify(userDetail));
                    changeUserInApiCall(userDetail.user_name);

                    userDetail.sessionHref &&
                        fetch(encodeURI(userDetail.sessionHref)).then((sessionResponse: any) => {
                            localStorage.setItem('userSessionData', JSON.stringify(sessionResponse.data._links.item));
                        });

                    return callback && callback(true);
                }
            });
        }
        else {
            return callback && callback(false);
        }
    });
};

export const signInAuto = (fetch: any) => {
    // Do an API Call to get the connected user (if we are connected)
    const getConnectedUserHRef = appConfig.apiHostURL + 'test/user';

    return fetch(encodeURI(getConnectedUserHRef)).then((response: any) => {
        if (response.status === 200) {
            const userName: string = response.data['user']?.toLowerCase();
            if (userName) {
                return signIn(
                    userName,
                    fetch,
                    (canLogged) => !canLogged && console.error(`User '${userName}' doesn't exist in WM`)
                ).then(() => Promise.resolve(true));
            }
            else {
                return Promise.resolve(false);
            }
        }
    });
};

export const signOut = () => () => null;
