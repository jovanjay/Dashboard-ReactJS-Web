import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from './actions';
import SideBarMenu from './SideBarMenu';

const mapStateProps = state => ({
    isOpen : state.sidebarReducer.get('isOpen'),
    current : state.sidebarReducer.get('current'),
    target : state.sidebarReducer.get('target'),
    broadcast : state.sidebarReducer.get('broadcast')
});

const mapDispatchToProps = dispatch => ({
    toggle : () => dispatch(actions.toggle()),
    load : (type, target) => dispatch(actions.load(type, target)),
    logout : () => dispatch(actions.logout()),
    broadcast : (data) => dispatch(actions.broadcast(data))
});

export default connect(mapStateProps, mapDispatchToProps)(withRouter(SideBarMenu));