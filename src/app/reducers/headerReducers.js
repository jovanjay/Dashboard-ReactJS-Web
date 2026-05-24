import * as actionTypes from '../lib/AppActionTypes';

const DEFAULT_STATE = {
    current: 'dashboard'
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actionTypes.LOAD_CONTENT:
            return { ...state, current: action.current };

        default:
            return state;
    }
}
