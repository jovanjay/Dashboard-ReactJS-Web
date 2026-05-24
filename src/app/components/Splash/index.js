import Splash from './Splash';
import * as actions from './actions';
import { connect } from 'react-redux';

const mapStateProps = state => ({
    isLoading: state.splashReducer.isLoading,
    isDataLoaded: state.splashReducer.isDataLoaded,
    data: state.splashReducer.data
});

const mapDispatchToProps = dispatch => ({
    init: () => dispatch(actions.init())
});

export default connect(mapStateProps, mapDispatchToProps)(Splash);
