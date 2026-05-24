import React from 'react';
import { Navigate } from 'react-router-dom';
import {
    Container,
    Card,
    Col,
    Row
} from 'react-bootstrap';

class Splash extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.init();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (window.ipcRenderer && this.props.isDataLoaded) {
            window.ipcRenderer.send('app-init', {
                isDataLoaded: this.props.isDataLoaded,
                data: this.props.data
            });
        }
    }

    render() {
        let r = this.props.data;

        if (this.props.isLoading) {
            return (
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="6">
                            <Card>
                                <Card.Body> Splash panel here ... </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        }

        if (!this.props.isLoading && this.props.isDataLoaded && r.hasOwnProperty('user')) {
            return <Navigate to="/dashboard" replace />;
        } else if (!this.props.isLoading && !r.hasOwnProperty('user')) {
            return <Navigate to="/login" replace />;
        }

        return null;
    }
}

export default Splash;
