import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const AIASlice = createSlice({
    name: 'aia',
    initialState,
    reducers: {
        aiaBAStart(state: any = initialState, action) {
            state[action.payload.baId] = {
                steps: {},
                props: action.payload.activityProps,
                current: undefined
            };

            return state;
        },
        aiaBAEnd(state: any, action: any) {
            delete state[action.payload.baId];
        },
        aiaBAUpdateProps(state: any, action) {
            if (state[action.payload.baId])
                state[action.payload.baId].props = {
                    ...state[action.payload.baId].props,
                    ...action.payload.activityProps
                };

            return state;
        },
        aiaStepSetCurrent(state: any, action: any) {
            const { baId, current } = action.payload;

            state[baId].steps.current = current;

            return state;
        },
        aiaStepAddInput(state: any, action: any) {
            const { baId, hRef, property, step, inputId } = action.payload;

            if (!state[baId].steps[step]) state[baId].steps[step] = {};

            if (!state[baId].steps[step][hRef]) state[baId].steps[step][hRef] = {};

            if (!state[baId].steps[step][hRef][property])
                state[baId].steps[step][hRef][property] = { status: {}, dataToPatch: undefined };

            state[baId].steps[step][hRef][property].status = { value: 'displayed', inputId };

            return state;
        },
        aiaStepRemoveInput(state: any, action: any) {
            const { baId, hRef, property, step } = action.payload;

            // This test is important, because if we close a Tab, the state[baId] doesn't exist any more
            if (state[baId] && state[baId].steps) {
                if (!state[baId].steps[step]) state[baId].steps[step] = {};

                if (!state[baId].steps[step][hRef]) state[baId].steps[step][hRef] = {};

                delete state[baId].steps[step][hRef][property];

                // Remove the ressource if no more input inside
                if (Object.keys(state[baId].steps[step][hRef]).length === 0) delete state[baId].steps[step][hRef];

                // Remove the ressource if no more input inside
                if (Object.keys(state[baId].steps[step]).length === 0) delete state[baId].steps[step];
            }

            return state;
        },
        aiaStepSetInputStatus(state: any, action: any) {
            const { baId, hRef, property, status } = action.payload;
            const currentStep = state[baId].steps.current;

            if (!state[baId].steps[currentStep]) state[baId].steps[currentStep] = {};

            if (!state[baId].steps[currentStep][hRef]) state[baId].steps[currentStep][hRef] = {};

            if (state[baId].steps[currentStep][hRef][property].status) {
                state[baId].steps[currentStep][hRef][property].status.value = status.value;
                state[baId].steps[currentStep][hRef][property].status.messageList = status.messageList;
            }

            return state;
        },
        aiaStepSetInputDataToPatch(state: any, action: any) {
            {
                const { baId, hRef, property, dataToPatch } = action.payload;

                const currentStep = state?.[baId]?.steps?.current;
                if (currentStep) {
                    if (!state[baId].steps[currentStep]) state[baId].steps[currentStep] = {};

                    if (!state[baId].steps[currentStep][hRef]) state[baId].steps[currentStep][hRef] = {};

                    state[baId].steps[currentStep][hRef][property].dataToPatch = dataToPatch.value;
                }
                return state;
            }
        },
        aiaStepSetInputDataToPost(state: any, action: any) {
            const { baId, hRef, postHref, payload, step, property } = action.payload;
            const currentStep = step ? step : state[baId].steps.current;

            if (!state[baId].steps[currentStep][hRef][property]) state[baId].steps[currentStep][hRef][property] = {};

            if (!state[baId].steps[currentStep][hRef][property].dataToPost)
                state[baId].steps[currentStep][hRef][property].dataToPost = {};

            state[baId].steps[currentStep][hRef][property].dataToPost = { postHref: postHref, payload: payload };
        },
        aiaStepClearDataToPatch(state: any, action: any) {
            const { baId, hRef, property } = action.payload;
            const currentStep = state[baId].steps.current;

            if (!state[baId].steps[currentStep]) state[baId].steps[currentStep] = {};

            if (!state[baId].steps[currentStep][hRef]) state[baId].steps[currentStep][hRef] = {};

            delete state[baId]?.steps[currentStep][hRef][property]?.dataToPatch;

            return state;
        },
        aiaStepClearDataToPost(state: any, action: any) {
            const { baId, hRef, property } = action.payload;
            const currentStep = state[baId].steps.current;

            delete state[baId].steps[currentStep][hRef][property].dataToPost;

            return state;
        }
    }
});
export default AIASlice.reducer;
export const {
    aiaBAStart,
    aiaBAEnd,
    aiaBAUpdateProps,
    aiaStepSetCurrent,
    aiaStepAddInput,
    aiaStepRemoveInput,
    aiaStepSetInputStatus,
    aiaStepSetInputDataToPatch,
    aiaStepSetInputDataToPost,
    aiaStepClearDataToPatch,
    aiaStepClearDataToPost
} = AIASlice.actions;
