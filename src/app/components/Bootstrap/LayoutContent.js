import React from "react";

import {
    Row,
    Col,
    Card
} from 'react-bootstrap';

class LayoutContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (<><Row className="mb-4 layout-content">
        <Col lg={12}>        
            <h2 className="content-title">Row &amp; Column Layout</h2>
            <p>A basic implementation of React-Bootstrap layout.</p>
        </Col>
        <Col lg={3} md={5} sm={12}>
            <Row>
                <Col lg={12} className="mb-4">                
                    <Card className="mb-4">
                        <Card.Body>Column 3</Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>Column 3</Card.Body>
                    </Card>
                </Col>
            </Row>
        </Col>
        <Col lg={9} md={7} sm={12} className="mb-4">
            <Row>
                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Body>Column 12</Card.Body>
                    </Card>
                </Col>

                <Col lg={4} className="mb-4">
                    <Card>
                        <Card.Body>Column 4</Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className="mb-4">
                    <Card>
                        <Card.Body>Column 4</Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className="mb-4">
                    <Card>
                        <Card.Body>Column 4</Card.Body>
                    </Card>
                </Col>

                <Col lg={12}>
                    <Card>
                        <Card.Body>Column 12</Card.Body>
                    </Card>
                </Col>
            </Row>            
        </Col>
        <Col lg={12}>   
            <h2 className="content-title">Custom Responsive Layout</h2>
            <p>Custom responsive layout based on the window size.</p>
        </Col>
        <Col lg={12}>
            <Row className="mb-4">
                <Col lg={12}>
                    <Card>
                        <Card.Body>Column 12</Card.Body>
                    </Card>
                </Col>
            </Row>
        </Col>    
    </Row></>)
    }
}

export default LayoutContent;