import Immutable from 'immutable';
import * as actionTypes from '../lib/AppActionTypes';

//Reducer
const DEFAULT_STATE = new Immutable.Map({
    data : {}
});

//let determine what to do with data on a specific state
export default function (state = DEFAULT_STATE, action) {

    switch (action.type) {

        //used by RESET
        default:
            return state;
    }
}

export const getUsertates = (state) => ({});