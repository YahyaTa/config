import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    addWindowTabActionInt as addSecondaryTabActionInt,
    changeWindowTabTitlesInt as changeSecondaryTabTitlesInt,
    selectedWindowTabInt as selectedSecondaryTabInt,
    windowTabsObjsInt as secondaryTabsObjsInt
} from './newWindowReducer';

interface SecondaryTabsInt {
    areSecondaryTabsOpened: boolean;
    selectedSecondaryTab: selectedSecondaryTabInt;
    historySelectedSecondaryTabs: Array<string>;
    secondaryTabsIDs: secondaryTabsObjsInt;
}

const initialState: SecondaryTabsInt = {
    areSecondaryTabsOpened: false,
    selectedSecondaryTab: { id: '' },
    historySelectedSecondaryTabs: [],
    secondaryTabsIDs: {}
};

const secondaryTabsSlice = createSlice({
    name: 'secondaryTabs',
    initialState,
    reducers: {
        openSecondaryTabs(state) {
            state.areSecondaryTabsOpened = true;
        },
        closeSecondaryTabs() {
            return initialState;
        },
        addSecondaryTabByID(state, action: PayloadAction<addSecondaryTabActionInt>) {
            let newArray = [...state.historySelectedSecondaryTabs];
            newArray.push(action.payload.tabId);

            let hRef: string | undefined;

            if (action.payload.href) {
                hRef = action.payload.href;
            }

            let newSecondaryTabsIDsObject: any = {};
            let isStateTabsNotEmpty = state.secondaryTabsIDs && Object.keys(state.secondaryTabsIDs).length !== 0;

            if (
                action.payload.openToRightOfCurrentTab &&
                isStateTabsNotEmpty &&
                state.selectedSecondaryTab.id !== 'empty string'
            ) {
                let currentTabId = state.selectedSecondaryTab.id;

                if (state.secondaryTabsIDs) {
                    for (let propName in state.secondaryTabsIDs) {
                        if (propName !== currentTabId && currentTabId !== 'empty string') {
                            newSecondaryTabsIDsObject[propName] = {
                                ...state.secondaryTabsIDs[propName]
                            };
                        }
                        else {
                            newSecondaryTabsIDsObject[propName] = {
                                ...state.secondaryTabsIDs[propName]
                            };
                            newSecondaryTabsIDsObject[action.payload.tabId] = {
                                key: 1,
                                tabTitles: action.payload.tabTitles,
                                type: action.payload.tabType,
                                href: hRef,
                                payload: action.payload.payload,
                                activityProps: action.payload.activityProps
                            };
                        }
                    }
                }
            }
            else {
                newSecondaryTabsIDsObject = {
                    ...state.secondaryTabsIDs,
                    [action.payload.tabId]: {
                        key: 1,
                        tabTitles: action.payload.tabTitles,
                        type: action.payload.tabType,
                        href: hRef,
                        payload: action.payload.payload,
                        activityProps: action.payload.activityProps
                    }
                };
            }

            return {
                areSecondaryTabsOpened: true,
                selectedSecondaryTab: {
                    id: action.payload.tabId
                },
                historySelectedSecondaryTabs: newArray,
                secondaryTabsIDs: newSecondaryTabsIDsObject
            };
        },
        changeSecondaryTabTitlesByID(state, action: PayloadAction<changeSecondaryTabTitlesInt>) {
            let { tabId, title, number } = action.payload;

            /*
                The SecondaryTabs component uses only them for setting the MemoTabButton subTitle.
            */
            let updatedTabObj = {
                ...state.secondaryTabsIDs[tabId]
            };

            const { tabTitles } = { ...updatedTabObj };
            if (tabTitles) {
                if (title) {
                    tabTitles.line1.i18n.param.title = title;
                    tabTitles.line2.i18n.param.title = title;
                }

                if (number) {
                    tabTitles.line1.i18n.param.number = number;
                    tabTitles.line2.i18n.param.number = number;
                }
            }

            if (title) {
                updatedTabObj.activityProps.title = title;
            }

            state.secondaryTabsIDs[tabId] = {
                ...updatedTabObj
            };
        },
        removeSecondaryTabByID(state, action: PayloadAction<string>) {
            let newTabsIDs = { ...state.secondaryTabsIDs };
            delete newTabsIDs[action.payload];
            let remainingTabIds = Object.keys(newTabsIDs);

            if (state.selectedSecondaryTab.id === action.payload) {
                if (remainingTabIds.length > 0) {
                    // Select the last visited tab that is still not closed
                    let selInd;
                    for (let i = state.historySelectedSecondaryTabs.length - 1; i >= 0; i--) {
                        if (remainingTabIds.indexOf(state.historySelectedSecondaryTabs[i]) !== -1) {
                            selInd = state.historySelectedSecondaryTabs[i];
                            break;
                        }
                    }

                    if (selInd !== undefined) state.selectedSecondaryTab.id = selInd;
                    else state.selectedSecondaryTab.id = remainingTabIds[0];

                    state.secondaryTabsIDs = newTabsIDs;
                }
                else {
                    state.selectedSecondaryTab.id = '';
                    state.historySelectedSecondaryTabs = [];
                    state.secondaryTabsIDs = {};
                    state.areSecondaryTabsOpened = false;
                }
            }
            else {
                state.secondaryTabsIDs = newTabsIDs;
            }
        },
        setSelectedSecondaryTabByID(state, action: PayloadAction<string>) {
            state.selectedSecondaryTab.id = action.payload;
            // The value 'empty string' is used when the user is not on the /viewTab route,
            // it signals that no tab should be active, so no need to add it to history
            if (action.payload !== 'empty string') state.historySelectedSecondaryTabs.push(action.payload);
        },
        refreshSecondaryTabByID(state, action: PayloadAction<string>) {
            let tabId = action.payload;

            // if the tab doesn't exist, do nothing
            if (!state.secondaryTabsIDs[tabId]) return;

            const updatedTabObj = {
                ...state.secondaryTabsIDs[tabId],
                key: (state.secondaryTabsIDs[tabId]?.key ?? 1) + 1
            };

            state.secondaryTabsIDs[tabId] = updatedTabObj;
        }
    }
});

export default secondaryTabsSlice.reducer;
export const {
    openSecondaryTabs,
    closeSecondaryTabs,
    addSecondaryTabByID,
    changeSecondaryTabTitlesByID,
    removeSecondaryTabByID,
    setSelectedSecondaryTabByID,
    refreshSecondaryTabByID
} = secondaryTabsSlice.actions;
