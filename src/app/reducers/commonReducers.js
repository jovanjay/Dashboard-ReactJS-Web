import * as actionTypes from '../lib/AppActionTypes';

const DEFAULT_STATE = {
    alert: {},
    isLoggedOut: false
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actionTypes.ALERT:
            return { ...state, alert: action.data };

        case actionTypes.LOGOUT_ATTEMPT:
            return { ...state, isLoggedOut: false };

        case actionTypes.LOGOUT_SUCCESS:
            return { ...state, isLoggedOut: true };

        default:
            return state;
    }
}
