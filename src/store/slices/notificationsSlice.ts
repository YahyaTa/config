import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
};

const NotificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        enqueueSnackbar(state: any, { payload }) {
            const key = payload.options && payload.options.key;
            state.notifications = [
                ...state.notifications,

                {
                    key: key || new Date().getTime() + Math.random(),
                    ...payload,
                },
            ];
        },
        removeSnackbar(state: any, { payload }:any) {
            state.notifications = state.notifications.filter(
                (notification: any) => notification.key !== payload
            );
        },
    },
});
export default NotificationsSlice.reducer;
export const { enqueueSnackbar, removeSnackbar } = NotificationsSlice.actions;
