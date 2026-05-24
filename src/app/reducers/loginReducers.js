import * as actionTypes from '../lib/AppActionTypes';

const DEFAULT_STATE = {
    isLoggedIn: false,
    loggingIn: false,
    loggingOut: false,
    loggedOut: false,
    error: {},
    data: {}
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actionTypes.LOGIN_ATTEMPT:
            return { ...state, loggingIn: true, data: action.data };

        case actionTypes.LOGIN_ERROR:
            return { ...state, loggingIn: false, loggingOut: false, isLoggedIn: false, error: action.error };

        case actionTypes.LOGIN_SUCCESS:
            return { ...state, loggingIn: false, loggingOut: false, isLoggedIn: true, error: {}, data: action.data };

        case actionTypes.LOGOUT_SUCCESS:
            return { ...state, loggingIn: false, loggingOut: false, isLoggedIn: false, loggedOut: true, error: {}, data: action.data };

        case actionTypes.LOGOUT_ATTEMPT:
            return { ...state, loggingOut: true, loggedOut: false, data: {} };

        default:
            return state;
    }
}

export const getLoginStates = (state) => ({
    isLogging: state.loginReducer.loggingIn,
    isLoggedIn: state.loginReducer.isLoggedIn,
    loggingOut: state.loginReducer.loggingOut,
    loggedOut: state.loginReducer.loggedOut,
    error: state.loginReducer.error
});
