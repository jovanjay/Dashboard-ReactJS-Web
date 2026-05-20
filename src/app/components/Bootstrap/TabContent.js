import React from "react";

import {
    Row,
    Col,
    Tabs,
    Tab,
    Nav,
    Card,
    Form,
    Button
} from 'react-bootstrap';

import {
    AddCircle,
    Cancel,
    Face
} from '@material-ui/icons';

class TabContent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            dynamicTabsSelected : 'dyn_tab_0',
            tabs : [
                {title : 'tab'}
            ]
        }
    }

    addTabs = () => {        
        let _tabs = [...this.state.tabs];
        
        _tabs.push({
            title : 'dynamic tab'
        });

        let new_tab = 'dyn_tab_' + (_tabs.length-1);

        this.setState({
            tabs : _tabs,
            dynamicTabsSelected : new_tab
        });
    }

    onTabAction = (tabType, actionType, index) => {
        let _tabs = [...this.state.tabs];

        if(tabType === 'dynamic_tab')
        {
            if(actionType === "remove") {
                _tabs.splice(index,1);
            }
        }

        this.setState({
            tabs : _tabs,
            dynamicTabsSelected : "dyn_tab_" + index
        });
    }

    sampleFormContent = () => (<div><Row>
            <Col>
                <Form>
                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                            <Form.Control size="sm" type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control size="sm" type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicChecbox" className="mb-3">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" size="sm" type="submit">  Submit</Button>
                </Form>
            </Col>
        </Row></div>)

    sampleContent = (custom_class) => (<div><Row className="mb-4">
            <Col>
            <div className={"sample-tab-content " + (custom_class)}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sollicitudin est, eu rhoncus massa. Maecenas cursus aliquam pellentesque. Integer eget turpis a neque laoreet finibus. Integer vel dolor nisi. Cras ullamcorper ex nulla, non lacinia risus facilisis id. Integer id faucibus est. Cras dui tellus, venenatis vel ornare quis, iaculis ac tellus.</p>
                <p>Nunc ultrices mauris pretium, gravida eros nec, tristique lorem. Pellentesque efficitur felis pulvinar enim euismod venenatis. Donec ullamcorper cursus lacus eget fermentum. Quisque sit amet orci pellentesque tortor </p>
                <p>suscipit tempor. Nunc at mollis justo. Nullam sed purus a turpis pharetra cursus. Cras molestie massa eget nunc volutpat, at efficitur ipsum mollis.</p>
                 
            </div>
            </Col>
        </Row></div>)

    render () {
        return (<div>
                <Row>
                    <Col lg={6} md={12} xs={12}>
                        <h2 className="content-title">Tabbed Content</h2>
                        <p>Tabbed contents with iCon and action button.</p>
                        <Tabs defaultActiveKey="tab_1">
                            <Tab eventKey="tab_1" title={<span><Face/> Tab 1</span>}>{this.sampleContent()}</Tab>
                            <Tab eventKey="tab_2" title={<span>Tab 2 <Cancel style={{fontSize: 15}}/></span>}>{this.sampleContent()}</Tab>
                            <Tab eventKey="tab_3" title={<span>Tab 3 <Cancel onClick={()=>{alert('tab action')}} style={{fontSize: 15}}/></span>}>{this.sampleContent()}</Tab>
                            <Tab eventKey="tab_4" title="Tab 4">{this.sampleContent()}</Tab>
                        </Tabs>
                    </Col>
                    <Col lg={6} md={12} xs={12}>                        
                        <h2 className="content-title">Dynamic Tabbed Content</h2>
                        <p>Dynamically add and delte tabbed contents.</p>
                        <Tabs defaultActiveKey="dyn_tab_0" onSelect={(k)=>{this.setState({dynamicTabsSelected:k})}} activeKey={this.state.dynamicTabsSelected}>
                            {this.state.tabs.map((item, index) => (
                                <Tab key={index} eventKey={"dyn_tab_" + index} title={<span>Tab {index} <Cancel onClick={()=>{this.onTabAction('dynamic_tab', 'remove', index)}} style={{fontSize: 15}}/></span>}>{this.sampleContent()}</Tab>
                            ))}
                            <Tab key={this.state.tabs.length} style={{fontSize: 20}} eventKey={"dyn_tab_" + this.state.tabs.length} title={<span><AddCircle style={{fontSize: 25}} onClick={() => this.addTabs()} /></span>}></Tab>
                        </Tabs>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={12} sm={12} xs={12} className="mb-4">
                        <h2 className="content-title">Active/Inactive Tabbed Content</h2>
                        <p>Tabbed Content inside a Card component.</p>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="tabCard1">
                            <Card>
                                <Card.Header>
                                    <Nav variant="tabs">
                                        <Nav.Item>
                                            <Nav.Link eventKey="tabCard1">Form</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="tabCard2">Text</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Card.Header>
                                <Card.Body>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="tabCard1">
                                            {this.sampleFormContent()}
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="tabCard2">
                                            <Card.Title>Special title treatment 2</Card.Title>
                                            <Card.Text>
                                                Donec in sollicitudin est, eu rhoncus massa. Maecenas cursus aliquam pellentesque. Integer eget turpis a neque laoreet finibus. Integer vel dolor nisi. Cras ullamcorper ex nulla, non lacinia risus facilisis id. Integer id faucibus est. Cras dui tellus, venenatis vel ornare quis, iaculis ac tellus.
                                            </Card.Text>
                                            <Row>
                                                <Col>
                                                    <Button variant="primary" className="pull-left">Go somewhere 2</Button>
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Card.Body>
                            </Card>
                        </Tab.Container>
                    </Col>
                    <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                        <h2 className="content-title">Vertical Tabbed Content</h2>
                        <p>Sidebar orientated menu.</p>
                        <Card>
                            <Card.Header>Featured</Card.Header>
                            <Card.Body>
                                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                    <Row>
                                        <Col lg={3} md={3} sm={4}>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                        <Col lg={9} md={9} sm={8}>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="first">{this.sampleContent('tab-content-right')}</Tab.Pane>
                                                <Tab.Pane eventKey="second">{this.sampleContent('tab-content-right')}</Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Card.Body>
                        </Card> 
                    </Col>
                </Row></div>)
    }
}

export default TabContent;