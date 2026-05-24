import * as actionTypes from '../lib/AppActionTypes';

const DEFAULT_STATE = {
    isDataLoaded: false,
    isLoading: false,
    data: {}
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actionTypes.APP_LOADING:
            return { ...state, isLoading: true };

        case actionTypes.APP_DATA_LOADED:
            return { ...state, isDataLoaded: true, isLoading: false, data: action.data };

        case actionTypes.APP_USER_ERROR:
            return { ...state, isDataLoaded: false, isLoading: false, data: {} };

        default:
            return state;
    }
}

export const getSplashStates = (state) => ({
    isLoading: state.splashReducer.isLoading,
    isDataLoaded: state.splashReducer.isDataLoaded
});
