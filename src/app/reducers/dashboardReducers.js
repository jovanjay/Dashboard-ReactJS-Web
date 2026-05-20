import Immutable from 'immutable';
import * as actionTypes from '../lib/AppActionTypes';

//Reducer
const DEFAULT_STATE = new Immutable.Map({
  onButtonClick : false,
  toast: [],
  areaGraphData: []
});

//let determine what to do with data on a specific state
export default function (state = DEFAULT_STATE, action) {
  
  switch (action.type) {

    case actionTypes.ON_BUTTON_CLICK:
        return state.merge({
            onButtonClick : false
        });

    case actionTypes.TOAST:
            return state.merge({
                toast : action.toast
            });

    case actionTypes.AREA_GRAPH_DATA:
      return state.merge({
        areaGraphData : action.data
      });
            
    default:
        return state;
  }
}

// a quick method te check data involve on "onLoggin" state
export const getDashboardStates = (state) => ({
});