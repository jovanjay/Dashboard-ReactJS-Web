import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Toast
} from 'react-bootstrap';

import {
    Info,
    WarningTwoTone,
    ErrorTwoTone,
    CheckCircleTwoTone
} from '@material-ui/icons';

import Menu from './components/SideBarMenu';
import Header from './components/Header';

// Components
import LoginScreen from './components/Login';
import SplashScreen from './components/Splash';
import DashboardScreen from './components/Dashboard';

import * as auth from './lib/AppAuth';

import Alert from './components/Elements/Alert';

import store from './Store';


class App extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            dashboardSideBarOpen : false,
            appType : '',
            isLoggedIn : false,
            currentModule : 'dashboard',
            toasts : []
        }

        /**
         * This event should track any store changes from different module component
         * events handled here should be any background processes eg. Toasts
         * 
         * Note: for each modules it should only process events  tied on it self as much as possible
         */
        
        let currentState;
        store.subscribe(() => {

            let prevState = currentState
            currentState = store.getState();

            //Auth
            const token = localStorage.getItem('app-auth-token');

            let _stateChanged = false;
            if(prevState !== currentState) {
                
                _stateChanged = true;

                let s = {};

                //reset the Core App data
                let isLoggedOutAction = false;

                //Common States
                if(currentState.commonReducer.get('alert') !== undefined) {
                    let toast = currentState.commonReducer.get('alert');
                    if(toast.id)
                    {
                        s.toasts = {
                            id : toast.id,
                            show : true,
                            timeout : 5000,
                            persist : true,
                            title : toast.title,
                            content : toast.content,
                            type: toast.type
                        };
                    }
                }                
                
                if (currentState.commonReducer.get('isLoggedOut') !== undefined 
                    && currentState.commonReducer.get('isLoggedOut')) {
                    isLoggedOutAction = true;
                    s.dashboardSideBarOpen = false;
                    s.appType = '';
                    s.isLoggedIn = false;
                    s.currentModule = 'login';
                    s.toasts = [];
                }

                if(!isLoggedOutAction) {
                    //Sidebar 
                    s.dashboardSideBarOpen = currentState.sidebarReducer.get('isOpen');
                    if(currentState.sidebarReducer.get('current')) {
                        s.currentModule = currentState.sidebarReducer.get('current')
                    }
                }

                //make sure we only update state if needed
                if(s !== {}) {
                    this.setState(s);
                    window.debug && console.debug('Core App', {
                        stateChange : _stateChanged,
                        sidebarOpen : currentState.sidebarReducer.get('isOpen'),
                        currentModule : currentState.sidebarReducer.get('current'),
                        isLoggedIn : s.isLoggedIn,
                        target : currentState.sidebarReducer.get('target'),
                        data : currentState.sidebarReducer.get('data'),
                        toast : this.state.toasts
                    });
                }
            } else {
                _stateChanged = false;
            }
        });       
    }

    componentDidMount = () => {
        /** Events from Window */
        if(window.ipcRenderer) {
            window.ipcRenderer.on('asynchronous-reply', (event, arg) => {
                console.debug('Window Events',{
                    args : arg
                })
            })
        } else {
            const token = localStorage.getItem('app-auth-token');
           window.debug && console.debug('User Info', {
               'user_token' : token,
               'user_id' : 0,
            });
        }
    }


    render() {
        return(<Router>
                    <Menu/>
                    <div className={"App " + (this.state.dashboardSideBarOpen ? " isOpen":"")}>
                        <Header/>
                        <Container fluid={true} className={(this.state.currentModule=='dashboard'?"dashboard-home":"")}>
                            <Route path="/" component={SplashScreen}/>
                            <Route path="/splash" component={SplashScreen}/>
                            <Route path="/login:filter?" component={LoginScreen}/>
                            <Route path="/dashboard" component={DashboardScreen}/>
                            <Alert data={this.state.toasts}/>
                        </Container>
                    </div>
                </Router>)   
    }
}

export default App;