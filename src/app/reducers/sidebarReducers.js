import Immutable from 'immutable';
import * as actionTypes from '../lib/AppActionTypes';

/**
 * Initial State
 */

 //Reducer
const DEFAULT_STATE = new Immutable.Map({
    isOpen: false,
    current: "dashboard",
    target: "",
    broadcast: {}
});

// Main Nav reducer
export default function (state = DEFAULT_STATE, action) {    
    let nextState;
    switch (action.type) {

        case actionTypes.SIDEBAR_OPEN :
            return state.merge({
                isOpen : action.isOpen
            });

        case actionTypes.LOAD_CONTENT :
            return state.merge({
                current : action.current,
                target: action.target
            });

        case actionTypes.BROADCAST :
            return state.merge({
                broadcast : action.broadcast
            });

        default: break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}

// a quick method te check data involve on "onLoggin" state
export const getIsOpen = (state) => ({
    isOpen: state.sidebarReducer.get('isOpen')
  });
