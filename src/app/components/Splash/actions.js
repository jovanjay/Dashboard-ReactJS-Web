import * as actionTypes from '../../lib/AppActionTypes';
import { getSplashStates } from '../../reducers/splashReducers';
import * as http from '../../lib/AppHttp';
import * as auth from '../../lib/AppAuth';

/**
 * 
 */
export const initialization = () => {
    const auth = localStorage.getItem('app-auth-token'); 
    return new Promise((resolve, reject) => {
        
        http.prod.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
        http.prod.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

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
 * 
 */
export const init = () => {
    return(dispatch, getState) => {
        const { isLoading } = getSplashStates(getState());
        if(!isLoading){

            dispatch({type : actionTypes.APP_LOADING});
            
            auth
                .checkAuth()
                .then((data) => {
                    dispatch({
                        type : actionTypes.APP_DATA_LOADED,
                        data : data
                    });
                })
                .catch((error) => {                    
                    dispatch({
                        type : actionTypes.APP_USER_ERROR,
                        data : {}
                    });
                });
        }
    }
}
