import Immutable from 'immutable';
import * as actionTypes from '../lib/AppActionTypes';

//Reducer
const DEFAULT_STATE = new Immutable.Map({
    isLoggedIn: false,
    loggingIn: false,
    loggingOut: false,
    loggedOut: false,
    error : {},
    data : {}
});

//let determine what to do with data on a specific state
export default function (state = DEFAULT_STATE, action) {
    
    switch (action.type) {

        case actionTypes.LOGIN_ATTEMPT:
            return state.merge({
                loggingIn : true,
                data : action.data
            });

        case actionTypes.LOGIN_ERROR:
            return state.merge({
                loggingIn: false,
                loggingOut: false,
                isLoggedIn: false,
                error: action.error
            });

        case actionTypes.LOGIN_SUCCESS:
            return state.merge({
                loggingIn: false,
                loggingOut: false,
                isLoggedIn: true,
                error: {},
                data : action.data
            });

        case actionTypes.LOGOUT_SUCCESS:
            return state.merge({
                loggingIn: false,
                loggingOut: false,
                isLoggedIn: false,
                loggedOut: true,
                error: {},
                data : action.data
            });

        case actionTypes.LOGOUT_ATTEMPT:
            return state.merge({
                loggingOut : true,
                loggedOut : false,
                data : {}
            });

        default:
            return state;
    }
}

// a quick method te check data involve on "onLoggin" state
export const getLoginStates = (state) => ({
  isLogging: state.loginReducer.get('loggingIn'),
  isLoggedIn: state.loginReducer.get('isLoggedIn'),
  loggingOut: state.loginReducer.get('loggingOut'),
  loggedOut: state.loginReducer.get('loggedOut'),
  error: state.loginReducer.get('error')
});
