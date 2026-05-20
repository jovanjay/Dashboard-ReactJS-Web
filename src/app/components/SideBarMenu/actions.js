import * as actionTypes from '../../lib/AppActionTypes';
import { getIsOpen } from '../../reducers/sidebarReducers';
import * as auth from '../../lib/AppAuth';

export const load = (type, target) => {
    return (dispatch, getState) => {
        dispatch({ 
            type: actionTypes.LOAD_CONTENT,
            current : type,
            target : target
        });
    }
}

export const broadcast = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type : actionTypes.BROADCAST,
            broadcast : data
        });
    }
}

export const logout = () => {
    return (dispatch, getState) => {

        dispatch({ 
            type: actionTypes.LOGOUT_ATTEMPT
        });

        auth
        .logoutAuth()
        .then((data) => {
            if(data.success !== "") {
                localStorage.removeItem('app-auth-token');
                dispatch({
                    type : actionTypes.LOGOUT_SUCCESS
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

export const toggle = () => {
    return (dispatch, getState) => {
        const { isOpen } = getIsOpen(getState());
        dispatch({ 
            type: actionTypes.SIDEBAR_OPEN,
            isOpen : !isOpen
        });
    }
}