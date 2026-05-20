import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from './actions';
import User from './User';

const mapStateProps = state => ({
    data : state.todolistReducer.get('data')
});

const mapDispatchToProps = dispatch => ({
    init : () => dispatch(actions.init())
});

export default connect(mapStateProps, mapDispatchToProps)(withRouter(User));