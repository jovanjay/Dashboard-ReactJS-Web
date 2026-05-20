import { combineReducers } from 'redux';
import * as actionTypes from '../lib/AppActionTypes';

import loginReducer from './loginReducers';
import dashboardReducer from './dashboardReducers';
import splashReducer from './splashReducers';
import sidebarReducer from './sidebarReducers';
import headerReducer from './headerReducers';
import userReducer from './userReducers';
import commonReducer from './commonReducers';

import applicationReducer from './Application/applicationReducers';
import subapplicationReducer from './Application/subapplicationReducers';


import todolistReducer from './todolistReducers';

//Combine all reducers
const appReducer = combineReducers({
    headerReducer,
    sidebarReducer,
    commonReducer,
    loginReducer,
    dashboardReducer,
    splashReducer,
    applicationReducer,
    subapplicationReducer,
    todolistReducer,
    userReducer
});


const rootReducer = (state, action) => {
    if(action.type == actionTypes.LOGOUT_SUCCESS) {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;
