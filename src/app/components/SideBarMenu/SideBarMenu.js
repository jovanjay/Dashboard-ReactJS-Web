import React from "react";
import {
    KeyboardArrowRight,
    KeyboardArrowLeft,
    DeveloperBoard,
    PictureInPicture,
    HomeSharp,
    Person,
    Assignment,
    ViewList,
    Subtitles,
    PowerSettingsNewOutlined,
    DesktopMacSharp,
    ChevronRight,
    KeyboardArrowDown,
    Tab
} from '@mui/icons-material';
import {
    Accordion,
    ListGroup,
    Button,
    Modal,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import * as appComponents from '../../lib/AppComponents';

import store from '../../Store';
import { getMenuItems as formMenuItems } from '../Bootstrap/Forms/FormContent';
import { getMenuItems as tablesMenuItems } from '../Bootstrap/TablesContent';
import { getMenuItems as applicationMenuItems } from '../Application/Application';

class SideBarMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuClass: "sidebar-menu",
            menuContainerClass: "sidebar-menu-container",
            menuHandleClass: "sidebar-handle",
            menuHandleContainerClass: "sidebar-handle-container",

            current: "",
            isOpen: false,
            hasSubApplication: false,
            menuItems: [],
            menuSelected: 0,

            showModal: false,
            showToasts: false,
            theme: 'dark'
        };

        this._unsubscribe = null;

        this.button = { top: [], bottom: [] };

        this.button.top = [
            { title: 'Dashboard', component: appComponents.DASHBOARD, icon: <HomeSharp /> },
            { title: 'Tabs', component: appComponents.TABS, icon: <Tab /> },
            { title: 'Tables', component: appComponents.TABLES, icon: <ViewList /> },
            { title: 'Forms', component: appComponents.FORMS, icon: <Subtitles /> },
            { title: 'User Profile', component: appComponents.USER, icon: <Person /> },
            { title: 'Layout', component: appComponents.LAYOUT, icon: <DeveloperBoard /> },
            { title: 'Modal/Alert', component: appComponents.MODAL, icon: <PictureInPicture /> },
        ];
    }

    componentDidMount() {
        let currentState;
        this._unsubscribe = store.subscribe(() => {
            let prevState = currentState;
            currentState = store.getState();

            if (prevState !== currentState) {
                let s = {};

                if (currentState.commonReducer.isLoggedOut !== undefined
                    && currentState.commonReducer.isLoggedOut) {
                    s.isOpen = false;
                    s.hasSubApplication = false;
                    s.menuItems = [];
                    s.menuSelected = 0;
                    s.current = "";
                    console.debug('Sidebar Logout', s);
                }

                if (Object.keys(s).length > 0) {
                    this.setState(s);
                }
            }
        });
    }

    componentWillUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    toggleMenu(type, target) {
        window.debug && console.debug('Toggle Menu Target', { target });

        let data = this.state.menuItems;
        let isOpen = this.props.isOpen;

        if (type !== '' && type !== 'toggle') {
            if (tablesMenuItems().componentGroup.some(item => type === item) && type === appComponents.TABLES) {
                data = tablesMenuItems().menuItems;
            } else if (applicationMenuItems().componentGroup.some(item => type === item) && type === appComponents.APPLICATION) {
                data = applicationMenuItems().menuItems;
            } else if (formMenuItems().componentGroup.some(item => type === item) && type === appComponents.FORMS) {
                data = formMenuItems().menuItems;
            } else if (!target) {
                data = [];
            }

            this.setState({
                current: type,
                menuItems: data,
                hasSubApplication: (data.length > 0)
            });
        }

        if (type !== '' && type !== this.state.current) {
            switch (type) {
                case 'toggle':
                    this.props.toggle();
                    break;
                default:
                    this.props.load(type, target);
                    if (data.length > 0) {
                        if (!isOpen) { this.toggleMenu('toggle', target); }
                    } else {
                        if (isOpen) { this.toggleMenu('toggle', target); }
                    }
                    break;
            }
        }

        if (window.ipcRenderer) {
            window.ipcRenderer.send('asynchronous-message', 'Menu Event : ' + type);
        }
    }

    isChildComponent = (child, data) => {
        let found = false;
        if (data.length > 0) {
            data.map((o) => {
                if (Array.isArray(o) && o.length) {
                    o.map((n) => { if (n.component === child) { found = true; } });
                } else if (o.component === child) {
                    found = true;
                }
            });
        }
        return found;
    }

    modalComp = () => (
        <Modal
            show={this.state.showModal}
            onHide={() => { this.toggleMenu(appComponents.SHOW_MODAL); }}
            dialogClassName="modal-100w"
            aria-labelledby="sidebar-modal-title"
            size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="sidebar-modal-title">Custom Modal Styling</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                    commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                    ipsam atque a dolores quisquam quisquam adipisci possimus
                    laboriosam.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { this.toggleMenu(appComponents.SHOW_MODAL); }}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

    menuSelected = (selected) => {
        this.setState({ menuSelected: selected });
    }

    sidebarPanel = () => (
        <Accordion defaultActiveKey="0" onSelect={(selected) => { this.menuSelected(selected); }} flush>
            {this.state.menuItems.map((item, index) => (
                <Accordion.Item key={index} eventKey={String(index + 1)}>
                    <Accordion.Header>
                        <strong>{item.label}</strong>
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                        {item.subMenu && (
                            <ul>
                                {item.subMenu.map((o, i) => (
                                    <li key={i}>
                                        <a onClick={() => { this.toggleMenu(o.component, o.parent); }}>{o.label}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )

    menuPanel = (sbOpen) => (
        <div className={"sidebar-menu " + (this.state.theme) + (this.props.isOpen ? " isOpen" : " ")} style={sbOpen}>
            <div className={this.state.menuHandleContainerClass}>
                <div className={this.state.menuHandleClass + " sidebar-handle-top"}>
                    {this.button.top.map((o, i) => (
                        <OverlayTrigger key={i} placement="right" overlay={<Tooltip>{o.title}</Tooltip>}>
                            <Button variant="link" className={this.state.current === o.component ? "sidebar-selected" : ""} onClick={() => { this.toggleMenu(o.component); }}>{o.icon}</Button>
                        </OverlayTrigger>
                    ))}
                </div>
                <div className={this.state.menuHandleClass + " sidebar-handle-bottom"}>
                    <OverlayTrigger placement="right" overlay={<Tooltip>Sample Application</Tooltip>}>
                        <Button variant="link" className={this.state.current === appComponents.APPLICATION ? "sidebar-selected" : ""} onClick={() => { this.toggleMenu(appComponents.APPLICATION, appComponents.APPLICATION); }}><DesktopMacSharp /></Button>
                    </OverlayTrigger>

                    <OverlayTrigger placement="right" overlay={<Tooltip>TODO List Application</Tooltip>}>
                        <Button variant="link" className={this.state.current === appComponents.TODOLIST ? "sidebar-selected" : ""} onClick={() => { this.toggleMenu(appComponents.TODOLIST); }}><Assignment /></Button>
                    </OverlayTrigger>

                    <Button variant="link" onClick={() => { this.props.logout(); }}><PowerSettingsNewOutlined /></Button>

                    <Button variant="link" disabled={!this.state.hasSubApplication} onClick={() => { this.toggleMenu('toggle'); }}>
                        {this.props.isOpen ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                </div>
            </div>
            <div className={this.state.menuContainerClass}>
                {this.sidebarPanel()}
            </div>
            {this.modalComp()}
        </div>
    )

    render() {
        let sbOpen = {};
        if (this.props.isOpen) {
            sbOpen = { position: 'absolute', top: 0, transform: `translateX(0%)` };
        }
        return (
            <div>
                {this.props.location.pathname === "/dashboard" && this.menuPanel(sbOpen)}
            </div>
        );
    }
}

export default SideBarMenu;
