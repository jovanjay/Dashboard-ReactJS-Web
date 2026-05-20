import React from 'react';

import {
    Row,
    Col,
    Alert
} from 'react-bootstrap';

import * as appComponents from '../../lib/AppComponents';
import CardPanel from './components/CardPanel';
import SubApplication from './SubApplication/SubApplication';
import store from '../../Store';

class Application extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            current : appComponents.APPLICATION,
            target : appComponents.APPLICATION,
            data : {
                title : 'Application',
                body : 'this content is from main location',
                footer : 'some footer'
            }
        }

        store.subscribe(() => {
            //content change from sidebar
            if(store.getState().sidebarReducer.get('current')) {
                this.setState({
                    current : store.getState().sidebarReducer.get('current'),
                    target : store.getState().sidebarReducer.get('target'),
                    data : store.getState().sidebarReducer.get('data')
                });
            }
        });
    }
    
    componentDidMount () {
        // console.log('Application Component mounted');
        console.debug('Application did mount', {
            data : this.state
        });        
        this.onLoadActions();
    }
    
    componentWillUnmount () {
        // console.log('Application Component unmounted');
        console.debug('Application Will Unmount', {
            data : this.state
        });
    }

    componentDidUpdate() {}
    
    onLoadActions = () => {
        console.debug('Application Loaded', {
            data : this.state,
            props : this.props
        });
    };

    mainApplicationPanel = () => {
        return(<div>
            <Row>
                <Col>
                    <Alert variant="primary">
                        <p>This is a simple demo showcasing the state handling between main application to sub application, up to the core Dashboard application and Core Application</p>
                    </Alert>
                </Col>
                <Col lg={12}>
                    Application<CardPanel data={this.state.data}/>
                </Col>
            </Row>
        </div>)
    }

    render(){
        return(<div>
            {this.state.target === appComponents.APPLICATION && this.state.current == appComponents.SUB_APPLICATION && <SubApplication/>}
            {this.state.target === appComponents.APPLICATION && this.state.current == appComponents.APPLICATION && this.mainApplicationPanel()}
        </div>)
    }
}

/** Only the top level application can have this declaration 
 * and can be access by any sub applications */
export const getMenuItems = () => ({
    menuItems : [
        {
            label : 'Application',
            component : appComponents.APPLICATION,
            subMenu : [
                {
                    label : 'Application',
                    parent : appComponents.APPLICATION, 
                    component : appComponents.APPLICATION
                },
                {
                    label : 'Sub Application',
                    parent : appComponents.APPLICATION, 
                    component : appComponents.SUB_APPLICATION
                }
            ]
        }
    ],
    componentGroup : [
        appComponents.APPLICATION,
        appComponents.SUB_APPLICATION
    ]
});

export default Application;