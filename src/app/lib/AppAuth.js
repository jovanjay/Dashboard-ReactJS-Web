import * as http from './AppHttp'

/**
 * Check Authorization
 */
export const checkAuth = () => {
    const auth = localStorage.getItem('app-auth-token'); 

    let headers = {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    };

    if(auth) {
        headers['Authorization'] = `Bearer ${auth}`;
    }

    return new Promise((resolve, reject) => {
        if(auth !== null) {
            window.debug && console.debug('User Auth check', {});            
            http.prod.post('/api/user', new URLSearchParams({}).toString(), {headers:headers})
            .then((user) => {
                if(!user.data.error && user.data.success) {
                    let userData = user.data.success;
                    if(userData.user && userData.user.id && userData.user.email) {
                        resolve({
                            user : userData.user
                        });
                    } else {
                        reject(Error('User initialization failed'));
                    }
                } else {
                    reject(Error(user.data.message));
                }
            })
            .catch((error) => {
                reject(Error(error))
            });
        } else {
            reject(Error('No token'))
        }
    });
}

/**
 * Login Auth
 */
 export const loginAuth = (data) => {
    
    let headers = {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    };

    return new Promise((resolve, reject) => {
        try {
            http.prod.post('/api/login', new URLSearchParams({
                email : data.email,
                password : data.password,
            }).toString(),{headers:headers})
            .then((response) => {
                if(response.data.success) {
                    let responseData = response.data.success;
                    if(responseData.token) {
                        localStorage.setItem('app-auth-token', responseData.token);
                        resolve({data: responseData});
                    } else {
                        reject(Error('Login failed'));
                        console.error(Error('Login failed'));
                    }
                }
            })
            .catch((error) => {
                reject(Error('Axios : ' + error));
                console.error(Error('Axios : ' + error));
            });            
        } catch (e) {
            reject(Error(e))
            console.error(Error(e));
        }
    });
 }

/**
 * Logout Auth
 */
export const logoutAuth = () => {
    const auth = localStorage.getItem('app-auth-token'); 
    if(auth) {
        
        let headers = {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        };
        
        if(auth) {
            headers['Authorization'] = `Bearer ${auth}`;
        }

        return new Promise((resolve, reject) => {
            if(auth != "") {            
                http.prod.post('/api/logout', null, {headers:headers})
                .then((data) => {
                    if(data.success != "") {
                        resolve({
                            data : data
                        });
                        localStorage.removeItem('app-auth-token');                        
                    } else {
                        reject(Error('Failed to logout'));
                    }
                })
                .catch((error) => {
                    reject(Error(error))
                });

            } else {
                reject(Error('No Token'));
            }
        });
    }
}