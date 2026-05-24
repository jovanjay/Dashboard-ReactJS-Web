import React from 'react';

import { Navigate } from 'react-router-dom';

import TabContent from '../Bootstrap/TabContent';

import TablesContent from '../Bootstrap/TablesContent';
import TablesPaginationContent from '../Bootstrap/TablesPaginationContent';
import TablesActionsContent from '../Bootstrap/TablesActionsContent';

import FormContent from '../Bootstrap/Forms/FormContent';
import ComplexFormContent from '../Bootstrap/Forms/ComplexFormContent';
import FormWizardContent from '../Bootstrap/Forms/FormWizardContent';
import LayoutContent from '../Bootstrap/LayoutContent';
import ModalContent from '../Bootstrap/ModalContent';

import HomeContent from '../Home';
import TodoList from '../TodoList';

import Application from '../Application/Application';

import User from '../User';

import * as appComponents from '../../lib/AppComponents';
import store from '../../Store';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: appComponents.DASHBOARD,
            target: appComponents.HOME,
            data: {},
            subMenus: [],
            loggedOut: (localStorage.getItem('app-auth-token') === null) ? true : false,
        };

        this._unsubscribe = null;
    }

    componentDidMount() {
        let currentState;
        this._unsubscribe = store.subscribe(() => {
            let prevState = currentState;
            currentState = store.getState();

            const token = localStorage.getItem('app-auth-token');
            let s = {};

            if (token === null) {
                s.loggedOut = true;
            }

            if (prevState !== currentState) {
                if (currentState.sidebarReducer.current) {
                    s.current = currentState.sidebarReducer.current;
                    s.target = currentState.sidebarReducer.target;
                    s.data = currentState.sidebarReducer.data;
                }
            }

            if (Object.keys(s).length > 0) {
                this.setState(s);
            }
        });

        this.onLoadActions();
    }

    componentWillUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    componentDidUpdate() {}

    onLoadActions = () => {
        console.debug('Dashboard Mounted', {
            state: this.state,
            props: this.props
        });

        this.props.init();
    }

    onActions = () => {}

    render() {
        if (this.state.loggedOut) {
            return <Navigate to="/login" replace />;
        } else {
            return (
                <div>
                    {this.state.current === appComponents.DASHBOARD && <HomeContent data={this.state.data} />}
                    {this.state.current === appComponents.TABS && <TabContent data={this.state.data} />}

                    {this.state.current === appComponents.TABLES && <TablesContent data={this.state.data} />}
                    {this.state.current === appComponents.TABLES_PAGINATION && <TablesPaginationContent />}
                    {this.state.current === appComponents.TABLES_ACTIONS && <TablesActionsContent />}

                    {this.state.current === appComponents.FORMS && <FormContent data={this.state.data} />}
                    {this.state.current === appComponents.COMPLEX_FORMS && <ComplexFormContent data={this.state.data} />}
                    {this.state.current === appComponents.FORM_WIZARD && <FormWizardContent data={this.state.data} />}

                    {this.state.current === appComponents.TODOLIST && <TodoList data={this.state.data} />}

                    {this.state.current === appComponents.USER && <User data={this.state.data} />}
                    {this.state.current === appComponents.LAYOUT && <LayoutContent data={this.state.data} />}
                    {this.state.current === appComponents.MODAL && <ModalContent data={this.state.data} />}

                    {this.state.target === appComponents.APPLICATION && <Application data={this.state.data} />}
                </div>
            );
        }
    }
}

export default Dashboard;
