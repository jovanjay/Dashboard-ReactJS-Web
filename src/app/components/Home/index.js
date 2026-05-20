import Home from './Home';
import * as actions from './actions';
import { connect } from 'react-redux';
import * as actionTypes from '../../lib/AppActionTypes';

const mapStateProps = state => ({    
    areaGraphData : state.dashboardReducer.get('areaGraphData'),
});

const mapDispatchToProps = dispatch => ({
    init : () => dispatch(actions.init())
})

export default connect(mapStateProps, mapDispatchToProps)(Home);