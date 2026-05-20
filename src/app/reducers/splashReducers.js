import Immutable from 'immutable';
import * as actionTypes from '../lib/AppActionTypes';

//Reducer
const DEFAULT_STATE = new Immutable.Map({
    isDataLoaded : false,
    isLoading : false,
    data : {}
});

//let determine what to do with data on a specific state
export default function (state = DEFAULT_STATE, action) {
    
    switch (action.type) {

        case actionTypes.APP_LOADING:
            return state.merge({
                isLoading : true
            });

        case actionTypes.APP_DATA_LOADED:
            return state.merge({
                isDataLoaded : true,
                isLoading : false,
                data : action.data
            });

        case actionTypes.APP_USER_ERROR:
            return state.merge({
                isDataLoaded : false,
                isLoading : false,
                data : {}
            });

        default:
            return state;
    }
}

// a quick method te check data involve on "onLoggin" state
export const getSplashStates = (state) => ({
    isLoading : state.splashReducer.get('isLoading'),
    isDataLoaded : state.splashReducer.get('isDataLoaded')
});
