import Header from './Header';
import * as actions from './actions';
import { connect } from 'react-redux';

const mapStateProps = state => ({
    isLoggedOut: state.headerReducer.isLoggedOut,
});

const mapDispatchToProps = dispatch => ({
    load: (type) => dispatch(actions.load(type)),
    logout: () => dispatch(actions.logout())
});

export default connect(mapStateProps, mapDispatchToProps)(Header);
