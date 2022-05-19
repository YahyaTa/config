import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    buttonsStatus: []
};

const DisabledButtonSlice = createSlice({
    name: 'disabledButtons',
    initialState,
    reducers: {
        transactionStart(state: any, { payload }) {
            state.buttonsStatus = [
                ...state.buttonsStatus,

                {
                    tabId: payload.tabId,
                    id: payload.id
                }
            ];
        },
        transactionEnd(state: any, { payload }: any) {
            state.buttonsStatus = state.buttonsStatus.filter(
                (button: any) => button.id !== payload.id || button.tabId !== payload.tabId
            );
        }
    }
});
export default DisabledButtonSlice.reducer;
export const { transactionStart, transactionEnd } = DisabledButtonSlice.actions;
