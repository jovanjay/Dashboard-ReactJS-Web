import React from 'react';

import DashboardContent from '../Bootstrap/DashboardContent';

import packageJson from '../../../../package.json';

import Charts from '../Elements/Chart/Chart';
import Table from '../Elements/DataTable';
import Calendar from 'react-calendar';

import {
    Form,
    Button,
    ButtonToolbar,
    Card,
    Row,
    Col,
    ListGroup,
    Modal,
    Badge,
    Alert
} from 'react-bootstrap';

import {
    Bathtub,
    Assistant,
    AttachFile,
    BugReport,
    Extension,
    Face,
    Fingerprint
} from '@mui/icons-material';

import store from '../../Store';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stats: [
                { id: 1, bg: "info", label: "Weekly Sales", type: "weekly_sales", value: 21.3 },
                { id: 2, bg: "info", label: "Total Order", type: "total_order", value: 133.3 },
                { id: 3, bg: "light", label: "Market Share", type: "market_share", value: 232.3 },
                { id: 4, bg: "warning", label: "Weather", type: "weather_now", value: 7.3 }
            ],
            showModal: false
        };

        this.config = {
            chart: {
                AreaChart: { config: { height: "300px", width: "100%" } },
                BarChart: { config: { height: "312px", width: "100%" } },
                MapChart: { config: { height: "312px", width: "100%" } }
            },
            table: {
                paginate: true,
                limit: true,
                remoteUrl: '',
                header: [
                    {
                        Header: 'Name',
                        columns: [
                            { Header: 'First Name', accessor: 'firstName' },
                            { Header: 'Last Name', accessor: 'lastName' },
                        ],
                    },
                    {
                        Header: 'Info',
                        columns: [
                            { Header: 'Age', accessor: 'age' },
                            { Header: 'Visits', accessor: 'visits' },
                            { Header: 'Status', accessor: 'status' },
                            { Header: 'Profile Progress', accessor: 'progress' },
                        ],
                    },
                ]
            }
        };

        this._unsubscribe = null;
    }

    componentDidMount() {
        this.props.init();

        if (!window.ipcRenderer) {
            this.setState({ showModal: true });
        }

        let currentState;
        this._unsubscribe = store.subscribe(() => {
            let prevState = currentState;
            currentState = store.getState();
            if (prevState !== currentState) {
            }
        });
    }

    componentWillUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.debug('Home State', {
            prev_props: prevProps,
            prev_state: prevState,
            this_props: this.props,
            this_state: this.state,
        });
    }

    modal = () => (
        <Modal size="lg" show={this.state.showModal} onHide={() => this.hideModal()}>
            <Modal.Header>
                <Modal.Title>Welcome, to the Fuze Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.modalContent()}</Modal.Body>
        </Modal>
    )

    hideModal = () => {
        this.setState({ showModal: false });
    }

    modalContent = () => (
        <>
            <Row>
                <Col lg={12} className="pe-4 ps-4 pb-4">
                    <p>
                        <strong>Fuze</strong> is a Front-End Framework project using <strong>ReactJS Components + Redux</strong>. It provides an easy way to implement an application interface that can be deployed via <strong>Web</strong> or as a <strong>Desktop Application</strong> using <strong>ElectronJS</strong>. It comes with basic reusable elements such as data-driven forms, tables, charts &amp; layouts. It uses <strong>React-Bootstrap</strong> as its main styled layout components.
                    </p>
                    <br />
                    <Button as="a" href={"http://www.jovanjay.com/?f=Fuze_Setup_" + packageJson.version}>Download App Version for Windows (v {packageJson.version})</Button>
                </Col>
            </Row>
        </>
    )

    onDateChange = () => {}

    render() {
        return (
            <div>
                {this.modal()}
                <Row>
                    <Col lg={7} md={6} sm={12} className="mb-3">
                        <Card bg="light" className="stats-panel stats-panel-row-first">
                            <Card.Body><Charts type="area" config={this.config.chart.AreaChart.config} data={this.config.chart.AreaChart.data} /></Card.Body>
                        </Card>
                    </Col>
                    <Col lg={5} md={6} sm={12}>
                        <Row>
                            {this.state.stats.map((item, index) => (
                                <Col key={index} lg={6} md={12} sm={12} className="mb-3">
                                    <Card bg="light" className="stats-panel mb-3">
                                        <Card.Body className="row">
                                            <Col lg={6} md={6} sm={6}>
                                                <p><strong>{item.label}</strong></p>
                                                <p className="font-sans-serif lh-1 mb-10 fs-4">{item.value}</p>
                                                <Badge pill bg={item.bg}>+2.3%</Badge>
                                            </Col>
                                            <Col lg={6} md={6} sm={6}>Chart here</Col>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={3} md={6} sm={12} className="mb-3">
                        <Calendar onChange={this.onDateChange} />
                    </Col>
                    <Col lg={5} md={6} sm={12} className="mb-3 stats-panel stats-panel-row-first">
                        <Card bg="light" className="stats-panel stats-panel-row-first">
                            <Card.Body><Charts type="bar" config={this.config.chart.BarChart.config} data={this.config.chart.BarChart.data} /></Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={12} sm={12} className="mb-3">
                        <Card bg="light" className="stats-panel stats-panel-row-first">
                            <Card.Body><Charts type="map" config={this.config.chart.MapChart.config} data={this.config.chart.MapChart.data} /></Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={8} md={12} sm={12} className="mb-3">
                        <Table config={this.config.table} />
                    </Col>
                    <Col lg={4} md={12} sm={12} className="mb-3">
                        <Card bg="light" className="stats-panel stats-panel-row-first">
                            <Card.Header>
                                <strong>Running Projects</strong>
                            </Card.Header>
                            <ListGroup>
                                <ListGroup.Item><Bathtub className="float-start me-3" /> Cras justo odio</ListGroup.Item>
                                <ListGroup.Item><Assistant className="float-start me-3" /> Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item><AttachFile className="float-start me-3" /> Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item><BugReport className="float-start me-3" /> Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item><Extension className="float-start me-3" /> Vestibulum at eros</ListGroup.Item>
                                <ListGroup.Item><Face className="float-start me-3" /> Vestibulum at eros</ListGroup.Item>
                                <ListGroup.Item><Fingerprint className="float-start me-3" /> Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                            <Card.Footer><center>Show All Projects</center></Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;
