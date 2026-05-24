import { connect } from 'react-redux';
import * as actions from './actions';
import TodoList from './TodoList';

const mapStateProps = state => ({
    isInitializing: state.todolistReducer.isInitializing,
    isInitialized: state.todolistReducer.isInitialized,

    isLoading: state.todolistReducer.isLoading,
    isLoaded: state.todolistReducer.isLoaded,

    isSaving: state.todolistReducer.isSaving,
    isSaved: state.todolistReducer.isSaved,

    isDeleting: state.todolistReducer.isDeleting,
    isDeleted: state.todolistReducer.isDeleted,

    data: state.todolistReducer.data,

    error: state.todolistReducer.error
});

const mapDispatchToProps = dispatch => ({
    action: (data, type) => dispatch(actions.action(data, type)),
    sync: () => dispatch(actions.sync()),
    reset: () => dispatch(actions.reset()),
    load: () => dispatch(actions.getTodoList()),
    init: () => dispatch(actions.initialize())
});

export default connect(mapStateProps, mapDispatchToProps)(TodoList);
