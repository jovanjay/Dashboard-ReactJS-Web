import Immutable from 'immutable';
import * as actionTypes from '../lib/AppActionTypes';

//Reducer
const DEFAULT_STATE = new Immutable.Map({
    alert: {},
    isLoggedOut: false
});

//let determine what to do with data on a specific state
export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {

            case actionTypes.ALERT:
                return state.merge({
                    alert : action.data
                });

            case actionTypes.LOGOUT_ATTEMPT :
                return state.merge({
                    isLoggedOut : false
                });
    
            case actionTypes.LOGOUT_SUCCESS :
                return state.merge({
                    isLoggedOut : true
                });
                
        default:
            return state;
    }
}