import React from "react";

import {
    Table,
    Row,
    Col,
    Tab,
    Nav,
    Card,
} from 'react-bootstrap';

import {
    Cancel,
    OpenInNew,
    Info
} from '@mui/icons-material';

import * as MockData from '../../lib/AppMakeData';
import * as appComponents from '../../lib/AppComponents';

import TablePaginationContent from './TablesPaginationContent';

class TablesContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            test: 'foo',
            subMenu: '',
            table_data_1: MockData.PersonData(6),
            table_tabs: [
                { row_count: 10, table_name: "Tab 1" },
                { row_count: 7, table_name: "Tab 2" },
                { row_count: 4, table_name: "Tab 3" },
                { row_count: 8, table_name: "Tab 4" },
                { row_count: 5, table_name: "Tab 5" },
                { row_count: 11, table_name: "Tab 6" }
            ]
        };
    }

    componentDidUpdate() {
        console.log(this.state.test);
    }

    componentDidMount = () => {}

    tableContent = (row_count) => {
        const data = MockData.PersonData(row_count);
        const rows = data.map((item, index) => (
            <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>{item.visits}</td>
                <td>{item.status}</td>
                <td>{item.progress}</td>
            </tr>
        ));

        return (
            <Table striped responsive hover className="mb-0">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Visits</th>
                        <th>Status</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        );
    }

    render() {
        return (
            <>
                <Row className="mb-3">
                    <Col>
                        <h2 className="content-title">Simple Table (Light)</h2>
                        <p>A simple themed table, with hover effects.</p>
                        <Card bg="light" className="stats-panel stats-panel-row-first">
                            <Table responsive hover size="md" as="Card.Body" className="mb-0">
                                <thead>
                                    <tr>
                                        <td colSpan="6">Light Theme <a className="float-end" onClick={() => {}}><Info /></a></td>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Age</th>
                                        <th>Visits</th>
                                        <th>Status</th>
                                        <th>Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.table_data_1.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.age}</td>
                                            <td>{item.visits}</td>
                                            <td>{item.status}</td>
                                            <td>{item.progress}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                    <Col>
                        <h2 className="content-title">Simple Table (Dark)</h2>
                        <p>A simple themed table, with hover effects and bordered.</p>
                        <Card bg="light" className="stats-panel stats-panel-row-first">
                            <Table striped bordered responsive hover size="md" variant="dark" as="Card.Body" className="mb-0">
                                <thead>
                                    <tr>
                                        <td colSpan="6">Dark Theme <a className="float-end" onClick={() => {}}><Cancel fontSize="small" /></a><a className="float-end me-1" onClick={() => {}}><OpenInNew fontSize="small" /></a></td>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Age</th>
                                        <th>Visits</th>
                                        <th>Status</th>
                                        <th>Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.table_data_1.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.age}</td>
                                            <td>{item.visits}</td>
                                            <td>{item.status}</td>
                                            <td>{item.progress}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="mt-3 mb-3 tabbed-tables" lg={12}>
                        <h2 className="content-title">Tabbed Table</h2>
                        <p>A table inside a tabbed content.</p>
                        <Tab.Container id="tabbed-tables-example" defaultActiveKey="tab_2">
                            <Card>
                                <Card.Header>
                                    <Nav variant="tabs">
                                        {this.state.table_tabs.map((item, index) => (
                                            <Nav.Item key={index}>
                                                <Nav.Link eventKey={"tab_" + index}>{item.table_name}</Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </Nav>
                                </Card.Header>
                                <Tab.Content>
                                    {this.state.table_tabs.map((item, index) => (
                                        <Tab.Pane key={index} eventKey={"tab_" + index}>
                                            {this.tableContent(item.row_count)}
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Card>
                        </Tab.Container>
                    </Col>
                </Row>
                <TablePaginationContent />
            </>
        );
    }
}

export const getMenuItems = () => ({
    menuItems: [
        {
            label: 'Tables',
            component: appComponents.TABLES,
            subMenu: [
                { label: 'Mixins', component: appComponents.TABLES, parent: appComponents.TABLES },
                { label: 'Pagination', component: appComponents.TABLES_PAGINATION, parent: appComponents.TABLES }
            ]
        },
        {
            label: 'Complex Tables',
            component: appComponents.TABLES,
            subMenu: [
                { label: 'Actions', component: appComponents.TABLES_ACTIONS, parent: appComponents.TABLES },
                { label: 'Context Menu', component: appComponents.TABLES_ACTIONS, parent: appComponents.TABLES }
            ]
        }
    ],
    componentGroup: [
        appComponents.TABLES,
        appComponents.TABLES_PAGINATION,
        appComponents.TABLES_ACTIONS
    ]
});

export default TablesContent;
