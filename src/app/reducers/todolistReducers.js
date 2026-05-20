import Immutable from 'immutable';
import * as actionTypes from '../lib/AppActionTypes';

//Reducer
const DEFAULT_STATE = new Immutable.Map({
    isInitializing : false,
    isInitialized : false,
    isSaving: false,
    isSaved: false,
    isDeleting: false,
    isDeleted: false,
    isLoading: false,
    isLoaded: false,
    isSyncing: false,
    error: false,
    data : {}
});

//let determine what to do with data on a specific state
export default function (state = DEFAULT_STATE, action) {

    switch (action.type) {

        case actionTypes.TODO_INITIALIZING:
            return state.merge({
                isInitializing : true,
                isInitialized : false,
                data : action.data
            });

        case actionTypes.TODO_INITIALIZED:
            return state.merge({
                isInitializing : false,
                isInitialized : true,
                data : action.data
            });

        case actionTypes.TODO_SAVING:
            return state.merge({
                isSaving : true,
                isSaved : false,
                data : action.data
            });

        case actionTypes.TODO_SAVED:
            return state.merge({
                isSaving : false,
                isSaved : true,
                data : action.data
            });

        case actionTypes.TODO_DELETING:
            return state.merge({
                isDeleting : true,
                isDeleted : false,
                data : action.data
            });

        case actionTypes.TODO_DELETED:
            return state.merge({
                isDeleting : false,
                isDeleted : true,
                data : action.data
            });

        case actionTypes.TODO_LOADING:
            return state.merge({
                isLoading: true,
                isLoaded: false,
                data : {}
            });

        case actionTypes.TODO_LOADED:
            return state.merge({
                isLoading: false,
                isLoaded: true,
                isSaving: false,
                isSaved: false,
                isDeleting: false,
                isDeleted: false,
                data : action.data
            });

        case actionTypes.TODO_ERROR:
            return state.merge({
                error: action.error,
                data : action.data,
                isSaving: false,
                isSaved: false,
                isDeleting: false,
                isDeleted: false,
                isLoading: false,
                isLoaded: false,
                isSyncing: false
            });

        case actionTypes.TODO_RESET:
            return state.merge({
                isInitializing : false,
                isInitialized : false,
                isSaving: false,
                isSaved: false,
                isDeleting: false,
                isDeleted: false,
                isLoading: false,
                isLoaded: false,
                isSyncing: false,
                error: false,
                data : {}
            });

        //used by RESET
        default:
            return state;
    }
}

// a quick method te check data involve on "onLoggin" state
export const getTodoStates = (state) => ({
  isSaving: state.todolistReducer.get('isSaving'),
  isDeleting: state.todolistReducer.get('isDeleting'),
  hasError: state.todolistReducer.get('error'),
  isLoading: state.todolistReducer.get('isLoading'),
  isSyncing: state.todolistReducer.get('isSyncing'),
  isInitializing: state.todolistReducer.get('isInitializing'),
  isInitialized: state.todolistReducer.get('isInitialized')
});
