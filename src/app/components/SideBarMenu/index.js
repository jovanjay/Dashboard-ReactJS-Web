import React from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import SideBarMenu from './SideBarMenu';

const mapStateProps = state => ({
    isOpen: state.sidebarReducer.isOpen,
    current: state.sidebarReducer.current,
    target: state.sidebarReducer.target,
    broadcast: state.sidebarReducer.broadcast
});

const mapDispatchToProps = dispatch => ({
    toggle: () => dispatch(actions.toggle()),
    load: (type, target) => dispatch(actions.load(type, target)),
    logout: () => dispatch(actions.logout()),
    broadcast: (data) => dispatch(actions.broadcast(data))
});

const SideBarMenuConnected = connect(mapStateProps, mapDispatchToProps)(SideBarMenu);

function SideBarMenuWrapper(props) {
    const location = useLocation();
    return <SideBarMenuConnected {...props} location={location} />;
}

export default SideBarMenuWrapper;
