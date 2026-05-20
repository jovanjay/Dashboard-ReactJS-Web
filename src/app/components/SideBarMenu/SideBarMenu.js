import React from "react";
import {
    Tab,
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
    KeyboardArrowDown
} from '@material-ui/icons';
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
import {getMenuItems as formMenuItems} from '../Bootstrap/Forms/FormContent';
import {getMenuItems as tablesMenuItems} from '../Bootstrap/TablesContent';
import {getMenuItems as applicationMenuItems} from '../Application/Application';
class SideBarMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            menuClass : "sidebar-menu",
            menuContainerClass : "sidebar-menu-container",
            menuHandleClass : "sidebar-handle",
            menuHandleContainerClass : "sidebar-handle-container",

            current : "",
            isOpen : false, 
            hasSubApplication : false,
            menuItems : [], //main menu items
            menuSelected : 0,
            
            showModal: false,
            showToasts : false,
            theme : 'dark'
        };

        this.sbOpen = {};

        this.button = {
            top : [],
            bottom : []
        };

        this.button.top = [
            {
                title : 'Dashboard',
                component : appComponents.DASHBOARD,
                icon : <HomeSharp/>
            },
            {
                title : 'Tabs',
                component : appComponents.TABS,
                icon : <Tab/>
            },
            {
                title : 'Tables',
                component : appComponents.TABLES,
                icon : <ViewList/>
            },
            {
                title : 'Forms',
                component : appComponents.FORMS,
                icon : <Subtitles/>
            },
            {
                title : 'User Profile',
                component : appComponents.USER,
                icon : <Person/>
            },
            {
                title : 'Layout',
                component : appComponents.LAYOUT,
                icon : <DeveloperBoard/>
            },
            {
                title : 'Modal/Alert',
                component : appComponents.MODAL,
                icon : <PictureInPicture/>
            },
        ];

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

                if (currentState.commonReducer.get('isLoggedOut') !== undefined 
                    && currentState.commonReducer.get('isLoggedOut')) {
                    s.isOpen = false;
                    s.hasSubApplication = false;
                    s.menuItems = [];
                    s.menuSelected = 0;
                    s.isOpen = false;
                    s.current = "";

                    console.debug('Sidebar Logout', s);
                }

                //make sure we only update state if needed
                if(s !== {}) {
                    this.setState(s);
                }
            }
        });

    }

    /**
     * 
     * @param {string} type - component to load
     * @param {string} target - target component to load, used in nested component structure
     */
    toggleMenu(type, target) {

        window.debug && console.debug('Toggle Menu Target', {target:target});

        // this.props.history.push('/forms');
        let data = this.state.menuItems;
        let isOpen = this.props.isOpen;

        //get sub menu
        if(type !== '' && type !== 'toggle') {
            if(tablesMenuItems().componentGroup.some(item => type === item) 
                && type === appComponents.TABLES) {
                data = tablesMenuItems().menuItems;
            } else if (applicationMenuItems().componentGroup.some(item => type === item) 
                && type === appComponents.APPLICATION) { 
                data = applicationMenuItems().menuItems;
            } else if (formMenuItems().componentGroup.some(item => type === item) 
                && type === appComponents.FORMS) { 
                data = formMenuItems().menuItems;
            } else if (!target){
                data = [];
            }

            this.setState({
                current: type,
                menuItems : data,
                hasSubApplication : (data.length > 0)
            });
        }

        if(type !== '' && type != this.state.current) {
            switch (type)
            {
                case 'toggle' :
                    this.props.toggle();
                    break;

                default:
                    this.props.load(type, target);

                    //open sidebar if ther are submenu      
                    if (data.length > 0) {
                        // this.isChildComponent(type, data);
                        if(!isOpen) {this.toggleMenu('toggle', target);}
                    } else {
                        if(isOpen) {this.toggleMenu('toggle', target);}
                    }
                    break;
            }
        }

        if(window.ipcRenderer) {
            window.ipcRenderer.send('asynchronous-message', 'Menu Event : ' + type)
        }
    }

    /** TODO */
    isChildComponent = (child, data) => {
        var parent = "";
        var found = false;
        if(data.length > 0) {
            data.map((o,i) => {
                parent = o.component;
                if(Array.isArray(o) && o.length){
                    o.map((n, m) => {
                        if(n.component == child) {
                            found = true;
                        }
                    })
                } else if(o.component == child) {
                    found = true;
                }
            })
        }
        return found;
    }

    modalComp = () => {
        return (<Modal
                    show={this.state.showModal}
                    onHide={() => {this.toggleMenu(appComponents.SHOW_MODAL)}}
                    dialogClassName="modal-100w"
                    aria-labelledby="example-custom-modal-styling-title"
                    size="lg"
                    >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Custom Modal Styling
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                        commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                        ipsam atque a dolores quisquam quisquam adipisci possimus
                        laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                        accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                        reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                        deleniti rem!
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{this.toggleMenu(appComponents.SHOW_MODAL)}}>Close</Button>
                </Modal.Footer>
            </Modal>);
    }

    menuSelected = (selected) => {
        this.setState({
            menuSelected : selected
        });
    }


    /** 
     * Items in sidebar should be declared on the functional components inside Dashboard
     */
    sidebarPanel = () => {
        return(
            <Accordion defaultActiveKey="0" onSelect={(selected)=>{this.menuSelected(selected)}}>
                {this.state.menuItems.map((item, index) => (
                    <ul key={index}>
                        <li>
                            <Accordion.Toggle as="a" eventKey={index+1}>
                                <strong>{item.label}</strong> {((index+1) == this.state.menuSelected)?<KeyboardArrowDown className="float-right"/>:<ChevronRight className="float-right"/>}
                            </Accordion.Toggle>
                            {item.subMenu && (
                                <Accordion.Collapse eventKey={index+1}>
                                    <ul>
                                        {item.subMenu.map((o, i) => (
                                            <li key={i}><a onClick={()=>{this.toggleMenu(o.component, o.parent)}}>{o.label}</a></li>
                                        ))}
                                    </ul>
                                </Accordion.Collapse>                               
                            )}
                        </li>
                    </ul>
                ))}
            </Accordion>
        )
    }

    /** Build the menu based on the applications */
    buildSideBarMenu = () => {}


    /** Main sidebar menu */
    menuPanel = (sbOpen) => (
        <div className={"sidebar-menu " + (this.state.theme) + (this.props.isOpen ? " isOpen" : " ")} style={sbOpen}>
            <div className={this.state.menuHandleContainerClass}>
                <div className={this.state.menuHandleClass + " sidebar-handle-top"}>
                    {this.button.top.map((o,i)=>(
                        <OverlayTrigger key={i} placement="right" overlay={<Tooltip>{o.title}</Tooltip>}>
                            <Button key={i} variant="link" className={this.state.current == o.component?"sidebar-selected":""} onClick={() => {this.toggleMenu(o.component)}}>{o.icon}</Button>
                        </OverlayTrigger>
                    ))}
                </div>
                <div className={this.state.menuHandleClass + " sidebar-handle-bottom"}>

                    <OverlayTrigger placement="right" overlay={<Tooltip>Sample Application</Tooltip>}>
                        <Button variant="link" className={this.state.current == appComponents.APPLICATION?"sidebar-selected":""} onClick={() => {this.toggleMenu(appComponents.APPLICATION, appComponents.APPLICATION)}}><DesktopMacSharp/></Button>
                    </OverlayTrigger>

                    <OverlayTrigger placement="right" overlay={<Tooltip>TODO List Application</Tooltip>}>
                        <Button variant="link" className={this.state.current == appComponents.TODOLIST?"sidebar-selected":""} onClick={() => {this.toggleMenu(appComponents.TODOLIST)}}><Assignment/></Button>
                    </OverlayTrigger>

                    <Button variant="link" onClick={()=>{this.props.logout()}}><PowerSettingsNewOutlined/></Button>

                    <Button variant="link" disabled={!this.state.hasSubApplication} onClick={() => {this.toggleMenu('toggle')}}>
                        {(this.props.isOpen ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>)}
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
        if(this.props.isOpen) {
            sbOpen = {
                position: 'absolute',
                top: 0, 
                transform: `translateX(0%)`
            };
        } else {
            sbOpen = {};
        }
        return(<div>{this.props.location.pathname === "/dashboard" && this.menuPanel(sbOpen)}</div>);
    }
}

export default SideBarMenu;