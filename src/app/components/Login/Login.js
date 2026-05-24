import React from 'react';

import { Navigate } from 'react-router-dom';
import {
    Card,
    Badge,
    Button,
    Container,
    Form,
    Row,
    Col,
    Spinner
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            success: false,
            loggedIn: false,
        };
    }

    componentDidMount() {
        this.props.init();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (window.ipcRenderer) {
            let bc = {};
            if (this.props.error.message && !this.props.isLoggedIn) {
                bc = { success: false, error: this.props.error.message };
            } else if (this.props.isLoggedIn) {
                bc = { success: true };
            }
            window.ipcRenderer.send('login-status', bc);
        }
    }

    login = (data, actions) => {
        this.props.login('local', data);
    }

    loadingPanel = () => (
        <Badge bg="success">Success</Badge>
    );

    render() {
        if (this.props.isLoggedIn) {
            return <Navigate to="/dashboard" replace />;
        } else {
            return (
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="login-panel">
                            <Card className="mt-50">
                                <Card.Header><center>Fuze Project</center></Card.Header>
                                <Card.Body className="pb-5 pe-4 ps-4">
                                    <Col className="mb-3 mt-3">
                                        <center>
                                            <h4>Sign In</h4>
                                            <p>Enter your email address and password to access admin panel.</p>
                                        </center>
                                    </Col>
                                    <Formik
                                        initialValues={{ email: 'test_user@gmail.com', password: 'admin1234' }}
                                        onSubmit={this.login}
                                        validationSchema={
                                            Yup.object().shape({
                                                email: Yup.string().email().required('Required'),
                                                password: Yup.string().required('Required')
                                            })
                                        }>
                                        {({
                                            handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            values,
                                            touched,
                                            isValid,
                                            errors
                                        }) => (
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="email"
                                                            placeholder="Enter your email address"
                                                            value={values.email}
                                                            onChange={handleChange}
                                                            isValid={touched.email && !errors.email}
                                                            className={errors.email && touched.email ? 'text-input error' : 'text-input'} />
                                                        {errors.email && touched.email && (<small className="input-feedback">{errors.email}</small>)}
                                                    </Form.Group>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            name="password"
                                                            placeholder="Password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            isValid={touched.password && !errors.password}
                                                            className={errors.password && touched.password ? 'text-input error' : 'text-input'} />
                                                        {errors.password && touched.password && (<small className="input-feedback">{errors.password}</small>)}
                                                    </Form.Group>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button variant="primary" type="submit" disabled={this.props.loggingIn}>
                                                            Login {this.props.loggingIn && <Spinner animation="border" size="sm" />}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                    </Formik>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Login;
