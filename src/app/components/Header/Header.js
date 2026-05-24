import React from "react";
import {
    Search,
    Face,
    Settings,
    Info,
    NotificationImportant,
    Mood,
    Person
} from '@mui/icons-material';
import {
    Breadcrumb,
    Navbar,
    Nav,
    Form,
    FormControl,
    InputGroup,
    NavDropdown,
    Container,
    Button,
    Dropdown,
    Image
} from 'react-bootstrap';

import store from '../../Store';
import * as appComponents from '../../lib/AppComponents';

import { getMenuItems as tablesMenuItems } from '../Bootstrap/TablesContent';
import { getMenuItems as applicationMenuItems } from '../Application/Application';

import * as auth from '../../lib/AppAuth';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            current: appComponents.DASHBOARD,
            broadcast: '',
            breadcrumb: [],
            breadcrumbFlat: [],
            isLoggedIn: false
        };

        this._unsubscribe = null;
    }

    componentDidMount() {
        let currentState;
        this._unsubscribe = store.subscribe(() => {
            let prevState = currentState;
            currentState = store.getState();

            const token = localStorage.getItem('app-auth-token');

            this.setState({
                isLoggedIn: (token !== null)
            });

            let c = store.getState().sidebarReducer.current;
            if (c !== '') {
                let breadcrumb = [];
                if (c === appComponents.TABLES) {
                    breadcrumb = tablesMenuItems().menuItems;
                } else if (c === appComponents.APPLICATION) {
                    breadcrumb = applicationMenuItems().menuItems;
                }
                this.setState({
                    current: c,
                    breadcrumb: breadcrumb,
                    breadcrumbFlat: this.breadcrumb(breadcrumb, c)
                });
            }
        });
    }

    componentWillUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    componentDidUpdate() {}

    toggleMenu = (type) => {}

    breadcrumb = (menu, current) => {
        if (!!menu && menu.length > 0) {
            menu.map((item, index) => {
                if (!!item.subMenu && item.subMenu.length > 0) {
                    item.subMenu.map((o) => ({
                        label: o.label,
                        component: o.component
                    }));
                }
            });
        }
        return [];
    }

    headerPanel = () => {
        if (this.state.isLoggedIn) {
            return (
                <div>
                    <Navbar expand="lg" className="w-100 app-header-nav">
                        <Navbar.Brand href="#home">
                            <Image
                                src="https://via.placeholder.com/30"
                                roundedCircle
                                className="me-2"
                                alt=""
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav className="me-3">
                                <Dropdown className="d-inline mx-2">
                                    <Dropdown.Toggle id="dropdown-autoclose-true" variant="light">
                                        <Person />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#logout" onClick={() => { this.props.logout(); }}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                            <Form>
                                <InputGroup>
                                    <FormControl type="text" placeholder="Search" />
                                    <Button variant="outline-secondary" size="sm"><Search /></Button>
                                </InputGroup>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                    {this.state.breadcrumbFlat.length > 0 && (
                        <Breadcrumb>
                            {this.state.breadcrumbFlat.map((item, index) => (
                                <Breadcrumb.Item key={index}>{item.label}</Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                    )}
                </div>
            );
        } else {
            return <div />;
        }
    }

    render() {
        return (
            <div>{this.state.current !== appComponents.DASHBOARD && this.headerPanel()}</div>
        );
    }
}

export default Header;
