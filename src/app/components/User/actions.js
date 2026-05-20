import { getUsertates } from '../../reducers/userReducers';
import * as actionTypes from '../../lib/AppActionTypes';
import * as http from '../../lib/AppHttp';

export const init = () => {
    return (dispatch, getState) => {
        console.log('User initializing');
    }
}