import { getDashboardStates } from '../../reducers/dashboardReducers';
import * as actionTypes from '../../lib/AppActionTypes';
import * as http from '../../lib/AppHttp';

export const init = () => {
    return (dispatch, getState) => {
        console.log('Home initializing');
    }
}