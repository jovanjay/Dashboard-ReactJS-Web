import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from './actions';
import TodoList from './TodoList';

const mapStateProps = state => ({
    isInitializing : state.todolistReducer.get('isInitializing'),
    isInitialized : state.todolistReducer.get('isInitialized'),

    isLoading : state.todolistReducer.get('isLoading'),
    isLoaded : state.todolistReducer.get('isLoaded'),
    
    isSaving : state.todolistReducer.get('isSaving'),
    isSaved : state.todolistReducer.get('isSaved'),

    isDeleting : state.todolistReducer.get('isDeleting'),
    isDeleted : state.todolistReducer.get('isDeleted'),

    data : state.todolistReducer.get('data'),

    error : state.todolistReducer.get('error')
});

const mapDispatchToProps = dispatch => ({
    action : (data, type) => dispatch(actions.action(data, type)),
    sync : () => dispatch(actions.sync()),
    reset : () => dispatch(actions.reset()),
    load : () => dispatch(actions.getTodoList()),
    init : () => dispatch(actions.initialize())
});

export default connect(mapStateProps, mapDispatchToProps)(withRouter(TodoList));