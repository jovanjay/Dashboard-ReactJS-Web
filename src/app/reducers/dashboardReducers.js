import * as actionTypes from '../lib/AppActionTypes';

const DEFAULT_STATE = {
    onButtonClick: false,
    toast: [],
    areaGraphData: []
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actionTypes.ON_BUTTON_CLICK:
            return { ...state, onButtonClick: false };

        case actionTypes.TOAST:
            return { ...state, toast: action.toast };

        case actionTypes.AREA_GRAPH_DATA:
            return { ...state, areaGraphData: action.data };

        default:
            return state;
    }
}

export const getDashboardStates = (state) => ({});
