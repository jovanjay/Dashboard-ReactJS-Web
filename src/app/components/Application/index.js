import Application from './Application';
import * as actions from './actions';
import { connect } from 'react-redux';

const mapStateProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    init : () => dispatch(actions.init())
})

export default connect(mapStateProps, mapDispatchToProps)(Application);