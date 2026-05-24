import * as actionTypes from '../lib/AppActionTypes';

const DEFAULT_STATE = {
    isInitializing: false,
    isInitialized: false,
    isSaving: false,
    isSaved: false,
    isDeleting: false,
    isDeleted: false,
    isLoading: false,
    isLoaded: false,
    isSyncing: false,
    error: false,
    data: {}
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case actionTypes.TODO_INITIALIZING:
            return { ...state, isInitializing: true, isInitialized: false, data: action.data };

        case actionTypes.TODO_INITIALIZED:
            return { ...state, isInitializing: false, isInitialized: true, data: action.data };

        case actionTypes.TODO_SAVING:
            return { ...state, isSaving: true, isSaved: false, data: action.data };

        case actionTypes.TODO_SAVED:
            return { ...state, isSaving: false, isSaved: true, data: action.data };

        case actionTypes.TODO_DELETING:
            return { ...state, isDeleting: true, isDeleted: false, data: action.data };

        case actionTypes.TODO_DELETED:
            return { ...state, isDeleting: false, isDeleted: true, data: action.data };

        case actionTypes.TODO_LOADING:
            return { ...state, isLoading: true, isLoaded: false, data: {} };

        case actionTypes.TODO_LOADED:
            return {
                ...state,
                isLoading: false, isLoaded: true,
                isSaving: false, isSaved: false,
                isDeleting: false, isDeleted: false,
                data: action.data
            };

        case actionTypes.TODO_ERROR:
            return {
                ...state,
                error: action.error, data: action.data,
                isSaving: false, isSaved: false,
                isDeleting: false, isDeleted: false,
                isLoading: false, isLoaded: false,
                isSyncing: false
            };

        case actionTypes.TODO_RESET:
            return { ...DEFAULT_STATE };

        default:
            return state;
    }
}

export const getTodoStates = (state) => ({
    isSaving: state.todolistReducer.isSaving,
    isDeleting: state.todolistReducer.isDeleting,
    hasError: state.todolistReducer.error,
    isLoading: state.todolistReducer.isLoading,
    isSyncing: state.todolistReducer.isSyncing,
    isInitializing: state.todolistReducer.isInitializing,
    isInitialized: state.todolistReducer.isInitialized
});
