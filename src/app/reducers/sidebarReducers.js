import * as actionTypes from '../lib/AppActionTypes';

const DEFAULT_STATE = {
    isOpen: false,
    current: 'dashboard',
    target: '',
    broadcast: {}
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actionTypes.SIDEBAR_OPEN:
            return { ...state, isOpen: action.isOpen };

        case actionTypes.LOAD_CONTENT:
            return { ...state, current: action.current, target: action.target };

        case actionTypes.BROADCAST:
            return { ...state, broadcast: action.broadcast };

        default:
            return state;
    }
}

export const getIsOpen = (state) => ({
    isOpen: state.sidebarReducer.isOpen
});
