import DisabledButtonsReducer from '../slices/disabledButtonSlice';
import notificationsReducer from '../slices/notificationsSlice';

import aiaReducer from './aiaReducer';
import camundaReducer from './camundaReducer';
import newWindowReducer from './newWindowReducer';
import secondaryTabsReducer from './secondaryTabsReducer';

const reducers = {
    camunda: camundaReducer,
    newWindow: newWindowReducer,
    secondaryTabs: secondaryTabsReducer,
    aia: aiaReducer,
    notifications: notificationsReducer,
    disabledButtons: DisabledButtonsReducer
};

export default reducers;
