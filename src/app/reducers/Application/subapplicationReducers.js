import Immutable from 'immutable';
import * as actionTypes from '../../lib/AppActionTypes';

//Reducer
const DEFAULT_STATE = new Immutable.Map({
    data : []
});

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {                
        default:
            return state;
      }
}