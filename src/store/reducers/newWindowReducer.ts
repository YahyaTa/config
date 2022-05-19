import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface addWindowTabActionInt {
    tabId: string;
    tabType: string;
    tabTitles?: any;
    href?: string;
    payload?: any;
    activityProps?: any;
    openToRightOfCurrentTab?: boolean;
}

export interface changeWindowTabTitlesInt {
    tabId: string;
    title?: string;
    number?: string;
}
export interface selectedWindowTabInt {
    id: string;
}

export interface windowTabsObjsInt {
    [key: string]: {
        tabTitles?: any;
        href?: string;
        payload?: any;
        type: string;
        activityProps?: any;
        key?: number;
    };
}

interface newWindowInt {
    isNewWindowWithTabsOpened: boolean;
    selectedWindowTab: selectedWindowTabInt;
    historySelectedWindowTabs: Array<string>;
    windowTabsIDs: windowTabsObjsInt;
}

const initialState: newWindowInt = {
    isNewWindowWithTabsOpened: false,
    selectedWindowTab: { id: '' },
    historySelectedWindowTabs: [],
    windowTabsIDs: {}
};

const newWindowSlice = createSlice({
    name: 'newWindow',
    initialState,
    reducers: {
        openWindowTabs(state) {
            state.isNewWindowWithTabsOpened = true;
        },
        closeWindowTabs() {
            return initialState;
        },
        addWindowTabByID(state, action: PayloadAction<addWindowTabActionInt>) {
            if (!state.isNewWindowWithTabsOpened) state.isNewWindowWithTabsOpened = true;
            state.selectedWindowTab.id = action.payload.tabId;
            state.historySelectedWindowTabs.push(action.payload.tabId);

            let URL: string | undefined;

            if (action.payload.href) {
                URL = action.payload.href;
            }
            state.windowTabsIDs[action.payload.tabId] = {
                type: action.payload.tabType,
                href: URL,
                activityProps: action.payload.activityProps
            };
        },
        changeWindowTabTitlesByID(state, action: PayloadAction<changeWindowTabTitlesInt>) {
            let tabId = action.payload.tabId;
            let title = action.payload.title;
            let updatedTabObj = {
                ...state.windowTabsIDs[tabId]
            };

            if (updatedTabObj && Object.keys(updatedTabObj).length > 0 && title) {
                if (updatedTabObj?.tabTitles.line1.i18n?.param?.title) {
                    updatedTabObj.tabTitles.line1.i18n.param.title = title;
                }
                if (updatedTabObj?.tabTitles.line2.i18n?.param?.title) {
                    updatedTabObj.tabTitles.line2.i18n.param.title = title;
                }
                updatedTabObj.activityProps.title = title;

                state.windowTabsIDs[tabId] = {
                    ...updatedTabObj
                };
            }
        },
        removeWindowTabByID(state, action: PayloadAction<string>) {
            let newTabsIDs = { ...state.windowTabsIDs };
            delete newTabsIDs[action.payload];
            let remainingTabIds = Object.keys(newTabsIDs);

            if (state.selectedWindowTab.id === action.payload) {
                if (remainingTabIds.length > 0) {
                    state.windowTabsIDs = newTabsIDs;
                    if (remainingTabIds.length > 0) {
                        // Select the last visited tab that is still not closed
                        let selInd;
                        for (let i = state.historySelectedWindowTabs.length - 1; i >= 0; i--) {
                            if (remainingTabIds.indexOf(state.historySelectedWindowTabs[i]) !== -1) {
                                selInd = state.historySelectedWindowTabs[i];
                                break;
                            }
                        }

                        if (selInd !== undefined) state.selectedWindowTab.id = selInd;
                        else state.selectedWindowTab.id = remainingTabIds[0];

                        state.windowTabsIDs = newTabsIDs;
                    }
                }
                else {
                    state.selectedWindowTab.id = '';
                    state.windowTabsIDs = {};
                    state.isNewWindowWithTabsOpened = false;
                }
            }
            else {
                state.windowTabsIDs = newTabsIDs;
            }
        },
        setSelectedWindowTabByID(state, action: PayloadAction<string>) {
            state.selectedWindowTab.id = action.payload;
            // The value 'empty string' is used when the user is not on the New Window portal component,
            // it signals that no tab should be active, so no need to add it to history
            if (action.payload !== 'empty string') state.historySelectedWindowTabs.push(action.payload);
        }
    }
});

export default newWindowSlice.reducer;
export const {
    openWindowTabs,
    closeWindowTabs,
    addWindowTabByID,
    changeWindowTabTitlesByID,
    removeWindowTabByID,
    setSelectedWindowTabByID
} = newWindowSlice.actions;
