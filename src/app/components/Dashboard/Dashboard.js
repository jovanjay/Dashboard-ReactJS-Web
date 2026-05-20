import React from 'react';

/** Core */

import {
    Info
} from '@material-ui/icons';

import { Redirect } from 'react-router-dom';

/** Components */
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

/** Helpers */
import * as appComponents from '../../lib/AppComponents';
import store from '../../Store';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        /** States variables */
        this.state = {
            current : appComponents.DASHBOARD,
            target : appComponents.HOME,
            data : {},
            subMenus : [],
            loggedOut : (localStorage.getItem('app-auth-token') === null)?true:false,
        }

        /** Get states from other reducer */
        let currentState;
        store.subscribe(() => {

            let prevState = currentState
            currentState = store.getState();

            //check token
            const token = localStorage.getItem('app-auth-token');

            let s = {}
            if(token === null) {
                s.loggedOut = true;
            }

            for(let r in currentState) {
                if (currentState.hasOwnProperty(r)) {
                    if(currentState[r].get('current') !== undefined) {

                    }
                }
            }

            if(prevState !== currentState) {
                //reset the Core App data
                // if (!s.loggedOut && currentState.headerReducer.get('isLoggedOut')){
                //     s.loggedOut = true;
                // }

                //Sidebar listener
                if(currentState.sidebarReducer.get('current')) {
                    s.current = currentState.sidebarReducer.get('current');
                    s.target = currentState.sidebarReducer.get('target');
                    s.data = currentState.sidebarReducer.get('data');
                }
            }

            if(s !== {}) {
                this.setState(s);
            }
        });
    }

    

    componentDidMount() {        
        this.onLoadActions();
    }

    componentWillUnmount() {}

    componentDidUpdate() {}

    /** Helper functions */
    onLoadActions = () => {

        console.debug('Dashboard Mounted', {
            state : this.state,
            props : this.props
        });

        this.props.init();
    }
    
    onActions = () => {}

    /**
     * Add main functional components here
     */
    render() {
        if(this.state.loggedOut) {
            return <Redirect to="/login"/>
        } else {
            return(<div>
                    {this.state.current === appComponents.DASHBOARD && <HomeContent data={this.state.data}/>}
                    {this.state.current === appComponents.TABS && <TabContent data={this.state.data}/>}
                    
                    {this.state.current === appComponents.TABLES && <TablesContent data={this.state.data}/>}
                    {this.state.current === appComponents.TABLES_PAGINATION && <TablesPaginationContent/>}
                    {this.state.current === appComponents.TABLES_ACTIONS && <TablesActionsContent/>}

                    {this.state.current === appComponents.FORMS && <FormContent data={this.state.data}/>}
                    {this.state.current === appComponents.COMPLEX_FORMS && <ComplexFormContent data={this.state.data}/>}
                    {this.state.current === appComponents.FORM_WIZARD && <FormWizardContent data={this.state.data}/>}

                    {this.state.current === appComponents.TODOLIST && <TodoList data={this.state.data}/>}

                    {this.state.current === appComponents.USER && <User data={this.state.data}/>}
                    {this.state.current === appComponents.LAYOUT && <LayoutContent data={this.state.data}/>}
                    {this.state.current === appComponents.MODAL && <ModalContent data={this.state.data}/>}

                    {this.state.target === appComponents.APPLICATION && <Application data={this.state.data}/>}
                </div>);
        }
    }
}

export default Dashboard;