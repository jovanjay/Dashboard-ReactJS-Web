import Immutable from 'immutable';
import * as actionTypes from '../lib/AppActionTypes';

/**
 * Initial State
 */

 //Reducer
const DEFAULT_STATE = new Immutable.Map({
    current: "dashboard"
});

// Main Nav reducer
export default function (state = DEFAULT_STATE, action) {
    let nextState;
    switch (action.type) {
        case actionTypes.LOAD_CONTENT :
            nextState = state.merge({
                current : action.current
            });
            break;

        default: break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}
