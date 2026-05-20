import * as actionTypes from '../../lib/AppActionTypes';
import * as http from '../../lib/AppHttp'
import { getTodoStates } from '../../reducers/todolistReducers';

/** Action creators */
export const todoError = (data) => {
    return { 
        type: actionTypes.TODO_ERROR,
        error: true,
        data: data
    };
}

export const todoSaved = (data) => {
    return { 
        type: actionTypes.TODO_SAVED,
        data: data
    };
}

export const todoDelete = (data) => {
    return { 
        type: actionTypes.TODO_DELETED,
        data: data
    };
}

export const reset = () => {    
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.TODO_RESET
        });
    }
}

/** Sync */
export const sync = () => {
    return (dispatch, getState) => {
        const { isSyncing } = getTodoStates(getState());
        if(!isSyncing) {
            dispatch({
                type : actionTypes.TODO_SYNCING
            });

            const auth = localStorage.getItem('app-auth-token'); 

            http.prod.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
            http.prod.defaults.headers.common['Accept'] = 'application/json';

            http.prod.post('/api/todo-list/sync')
            .then((response) => {})
            .catch((error) => {
                dispatch({
                    type : actionTypes.TODO_ERROR,
                    error : error
                });
            });
        }
    }
}

/** Initialize Todo list */
export const initialize = () => {
    return (dispatch, getState) => {

        const { isInitializing } = getTodoStates(getState());

        console.debug('Todolist Initializing...',{
            init : isInitializing
        });

        if(!isInitializing) {

            dispatch({
                type : actionTypes.TODO_INITIALIZING
            });

            const auth = localStorage.getItem('app-auth-token');

            let headers = {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            };

            if(auth) {
                headers['Authorization'] = `Bearer ${auth}`;
            }

            http.prod.post('/api/todo-list/init', 
            new URLSearchParams({}).toString(), 
            {headers:headers})
            .then((response) => {
                if(response?.data?.success) {
                    dispatch({
                        type : actionTypes.TODO_INITIALIZED,
                        data : response.data.success
                    });
                }else {
                    dispatch(todoError('Handshake fail'));
                }
            })
            .catch((error) => {
                dispatch(todoError(error));
            });
        }
    }
}

/** Get Todolist */
export const getTodoList = () => {
    return (dispatch, getState) => {        
        const { hasError, isLoading, isSyncing } = getTodoStates(getState());

        console.debug('Todolist loading...',{
            hasError : hasError,
            isLoading : isLoading,
            isSyncing : isSyncing,
        });

        if(!isLoading && !isSyncing && !hasError) {

            dispatch({
                type : actionTypes.TODO_LOADING
            });

            const auth = localStorage.getItem('app-auth-token');

            let headers = {
                'Accept': '*/*'
            };

            if(auth) {
                headers['Authorization'] = `Bearer ${auth}`;
            }

            http.prod.get('/api/todo-list/read',
            {headers:headers})
            .then((response) => {
                if(response?.data?.success?.tasks) {
                    dispatch({
                        type : actionTypes.TODO_LOADED,
                        data : response.data.success
                    });
                } else {
                    dispatch(todoError('Empty tasks'));
                }
            })
            .catch((error) => {
                dispatch(todoError(error));
            });
        }
    }
}

export const action = (data, type) => {
    return (dispatch, getState) => {

        const { isSaving, isDeleting } = getTodoStates(getState());
        const auth = localStorage.getItem('app-auth-token');

        console.debug({
            data : data,
            type : type,
            isDeleting : isDeleting,
            isSaving : isSaving,
        });

        let headers = {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        };

        if(auth) {
            headers['Authorization'] = `Bearer ${auth}`;
        }

        // save/update
        if(type == "save" && !isSaving) {

            let todo = {
                task : ''
            };

            dispatch({
                type : actionTypes.TODO_SAVING,
                data : data
            });

            todo.task = data.task;

            if(data.id !== "") {                
                todo.status = 'updated';
                todo.order = data.order;
                todo.updated_at = '';
                
                http.prod.put("/api/todo-list/update/" + data.id, 
                new URLSearchParams(todo).toString(), 
                {headers:headers})
                .then((response) => {
                    if(response?.data?.success) {
                        if(response?.data?.success?.task) {
                            let task = response.data.success.task;
                            task.index = data.index;
                            dispatch(todoSaved(task));
                        }
                    } else {
                        dispatch(todoError(data));
                    }
                })
                .catch((error) => {
                    dispatch(todoError(error));
                });
            } else {
                todo.order = 0;
                http.prod.post("/api/todo-list/create", 
                new URLSearchParams(todo).toString(),
                {headers:headers})
                .then((response) => {    
                    if(response?.data?.success) {
                        if(response?.data?.success?.task) {
                            let task = response.data.success.task;
                            task.index = data.index;
                            dispatch(todoSaved(task));
                        }
                    } else {
                        dispatch(todoError(data));
                    }
                })
                .catch((error) => {
                    dispatch(todoError(error));
                });
            }
        }
        
        // delete
        else if(type == "remove" && !isDeleting){

            dispatch({
                type : actionTypes.TODO_DELETING,
                data : data.task
            });

            if(data?.task?.id) {
                
                http.prod.delete("/api/todo-list/delete/" + data.task.id, 
                {headers:headers})
                .then((response) => {
                    if(response?.data?.success) {
                        dispatch(todoDelete(data));
                    } else {
                        dispatch(todoError(data));
                    }
                })
                .catch((error) => {
                    dispatch(todoError(error));
                });
            } 
            else if(data?.index > -1) {
                setTimeout(()=>{dispatch(todoDelete(data));},100);
            }
        }
    }
}
