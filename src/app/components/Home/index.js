import Home from './Home';
import * as actions from './actions';
import { connect } from 'react-redux';

const mapStateProps = state => ({
    areaGraphData: state.dashboardReducer.areaGraphData,
});

const mapDispatchToProps = dispatch => ({
    init: () => dispatch(actions.init())
});

export default connect(mapStateProps, mapDispatchToProps)(Home);
