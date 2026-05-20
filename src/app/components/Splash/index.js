import Splash from './Splash';
import * as actions from './actions';
import { connect } from 'react-redux';

const mapStateProps = state => ({
    isLoading : state.splashReducer.get('isLoading'),
    isDataLoaded : state.splashReducer.get('isDataLoaded'),
    data : state.splashReducer.get('data')
});

const mapDispatchToProps = dispatch => ({
    init : () => dispatch(actions.init())
})

export default connect(mapStateProps, mapDispatchToProps)(Splash);