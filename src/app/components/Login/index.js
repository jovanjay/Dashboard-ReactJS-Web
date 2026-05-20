import Login from './Login';
import * as actions from './actions';
import { connect } from 'react-redux';

const mapStateProps = state => ({
    loggingIn : state.loginReducer.get('loggingIn'),
    isLoggedIn : state.loginReducer.get('isLoggedIn'),
    error : state.loginReducer.get('error')
});

const mapDispatchToProps = dispatch => ({
    init : () => dispatch(actions.init()),
    login : (type, data) => dispatch(actions.login(type, data))
})

export default connect(mapStateProps, mapDispatchToProps)(Login);