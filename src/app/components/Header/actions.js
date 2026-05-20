import * as actionTypes from '../../lib/AppActionTypes';

import * as auth from '../../lib/AppAuth';

export const load = (type) => {
    return (dispatch, getState) => {
        dispatch({ 
            type: actionTypes.LOAD_CONTENT,
            current : type
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