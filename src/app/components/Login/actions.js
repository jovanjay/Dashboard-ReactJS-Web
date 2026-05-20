import * as actionTypes from '../../lib/AppActionTypes';
import { getLoginStates } from '../../reducers/loginReducers';
import * as http from '../../lib/AppHttp';
import * as auth from '../../lib/AppAuth';

/** action creators */
export const loginFail = (error) => {
    return { 
        type: actionTypes.LOGIN_ERROR,
        error: error
    };
}

export const loginAttempt = () => {
    return { 
        type: actionTypes.LOGIN_ATTEMPT 
    };
}

export const loginSuccess = () => {
    return { 
        type: actionTypes.LOGIN_SUCCESS 
    };
}

export const loginInit = () => {
    return { 
        type: actionTypes.LOGIN_INIT 
    };
}

/** actions */
export const facebook = async () => {}
export const twitter = async () => {}

/**
 * 
 * @param {*} data 
 */
export const local = (data) => {
    return auth.loginAuth(data);
}

/**
 * 
 */
export const initialization = () => {
    const auth = localStorage.getItem('app-auth-token'); 
    return new Promise((resolve, reject) => {
        
        http.prod.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
        http.prod.defaults.headers.common['Accept'] = 'application/json';

        http.prod.post('/api/user')
        .then((user) => {
            if(user.data.success) {
                let userData = user.data.success;
                if(userData.user && userData.user.id && userData.user.email) {
                    resolve({
                        user : userData.user
                    });
                } else {
                    reject(Error('User initialization failed'));
                }
            }
        })
        .catch((error) => {
            reject(Error(error))
        });
    });
}

/**
 * Initialization
 */
export const init = () => {
    return(dispatch, getState) => {
        const { loggingIn } = getLoginStates(getState());
        if(!loggingIn){
            dispatch(loginInit());

            // initialization()
            // .then((data) => {
            //     console.log('init success');
            //     dispatch({
            //         type : actionTypes.LOGIN_SUCCESS,
            //         data : data
            //     });
            // })
            // .catch((error) => {
            //     console.error(error);
            //     dispatch({
            //         type : actionTypes.LOGIN_ERROR,
            //         data : {}
            //     });
            // });
        }
    }
}

/**
 * 
 */
export const logout = () => {}

/**
 * Login action
 * 
 * @param {*} type 
 * @param {*} data 
 */
export const login = (type, data) => {
    return (dispatch, getState) => {
        
        const { onLogging } = getLoginStates(getState());
        
        if(!onLogging)
        {
            // tell app a login attempt is initiated
            dispatch(loginAttempt());

            // facebook
            if(type === 'facebook') {
                facebook()
                .then(() => {
                    dispatch(loginSuccess());
                })
                .catch((error) => {
                    dispatch(loginFail(error));
                });
            }

            // local
            else if(type === 'local') {
                local(data)
                .then((response) => {
                    dispatch(loginSuccess());
                })
                .catch((error) => {
                    dispatch(loginFail(error));
                })
            }
        }
    }
}
