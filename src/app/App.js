import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Menu from './components/SideBarMenu';
import Header from './components/Header';

import LoginScreen from './components/Login';
import SplashScreen from './components/Splash';
import DashboardScreen from './components/Dashboard';

import Alert from './components/Elements/Alert';

import store from './Store';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dashboardSideBarOpen: false,
            appType: '',
            isLoggedIn: false,
            currentModule: 'dashboard',
            toasts: []
        };

        this._unsubscribe = null;
    }

    componentDidMount() {
        let currentState;
        this._unsubscribe = store.subscribe(() => {
            let prevState = currentState;
            currentState = store.getState();

            let _stateChanged = false;
            if (prevState !== currentState) {
                _stateChanged = true;

                let s = {};
                let isLoggedOutAction = false;

                if (currentState.commonReducer.alert !== undefined) {
                    let toast = currentState.commonReducer.alert;
                    if (toast.id) {
                        s.toasts = {
                            id: toast.id,
                            show: true,
                            timeout: 5000,
                            persist: true,
                            title: toast.title,
                            content: toast.content,
                            type: toast.type
                        };
                    }
                }

                if (currentState.commonReducer.isLoggedOut !== undefined
                    && currentState.commonReducer.isLoggedOut) {
                    isLoggedOutAction = true;
                    s.dashboardSideBarOpen = false;
                    s.appType = '';
                    s.isLoggedIn = false;
                    s.currentModule = 'login';
                    s.toasts = [];
                }

                if (!isLoggedOutAction) {
                    s.dashboardSideBarOpen = currentState.sidebarReducer.isOpen;
                    if (currentState.sidebarReducer.current) {
                        s.currentModule = currentState.sidebarReducer.current;
                    }
                }

                if (Object.keys(s).length > 0) {
                    this.setState(s);
                    window.debug && console.debug('Core App', {
                        stateChange: _stateChanged,
                        sidebarOpen: currentState.sidebarReducer.isOpen,
                        currentModule: currentState.sidebarReducer.current,
                        isLoggedIn: s.isLoggedIn,
                        target: currentState.sidebarReducer.target,
                        toast: this.state.toasts
                    });
                }
            }
        });

        if (window.ipcRenderer) {
            window.ipcRenderer.on('asynchronous-reply', (event, arg) => {
                console.debug('Window Events', { args: arg });
            });
        } else {
            const token = localStorage.getItem('app-auth-token');
            window.debug && console.debug('User Info', {
                'user_token': token,
                'user_id': 0,
            });
        }
    }

    componentWillUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    render() {
        return (
            <Router>
                <Menu />
                <div className={"App" + (this.state.dashboardSideBarOpen ? " isOpen" : "")}>
                    <Header />
                    <Container fluid className={this.state.currentModule === 'dashboard' ? "dashboard-home" : ""}>
                        <Routes>
                            <Route path="/" element={<SplashScreen />} />
                            <Route path="/splash" element={<SplashScreen />} />
                            <Route path="/login" element={<LoginScreen />} />
                            <Route path="/login/:filter" element={<LoginScreen />} />
                            <Route path="/dashboard" element={<DashboardScreen />} />
                        </Routes>
                        <Alert data={this.state.toasts} />
                    </Container>
                </div>
            </Router>
        );
    }
}

export default App;
