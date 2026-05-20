import React from 'react';

import { BrowserRouter as Router, Redirect } from 'react-router-dom';
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
import {Formik} from 'formik';
import * as Yup from 'yup';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            success : false,
            loggedIn : false,
            formRegister : [
                {
                    id : "name",
                    label : "Name",
                    placeholder: "Name",
                    value : "",
                    type : "text",
                    rule : {}
                },
                {
                    id : "email",
                    label : "Email",
                    placeholder: "Email",
                    value : "",
                    type : "text",
                    rule : {}
                },
                {
                    id : "password",
                    label : "Password",
                    placeholder: "Password",
                    value : "",
                    type : "password",
                    rule : {}
                },
                {
                    id : "c_password",
                    label : "Confirm Password",
                    placeholder: "Confirm Password",
                    value : "",
                    type : "password",
                    rule : {}
                }
            ],
            formLogin : [
                {
                    id : "email",
                    label : "Email",
                    placeholder: "Email",
                    value : "",
                    type : "text",
                    rule : {}
                },
                {
                    id : "password",
                    label : "Password",
                    placeholder: "Password",
                    value : "",
                    type : "password",
                    rule : {}
                }
            ]
        };
    }

    componentDidMount () {
        this.props.init();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        //Desktop
        if(window.ipcRenderer) {
            let bc = {};
            if(this.props.error.message && !this.props.isLoggedIn) {
                bc = {
                    success : false,
                    error : this.props.error.message
                };
            } 
            else if (this.props.isLoggedIn){
                bc = {
                    success : true
                }
            }            
            window.ipcRenderer.send('login-status', bc);
        }

        //Web
        else {
        }
    }

    /** Helper functions */
    login = (data, actions) => {
        this.props.login('local', data);
    }

    /** Component Panels */
    loadingPanel = () => (
        <Badge variant="success">Success</Badge>
    );

    /** Renderer */
    render() {
        if(this.props.isLoggedIn) {
            return <Redirect to="/dashboard"/>
        } else {
            return(<Container>
                <Row className="justify-content-md-center">
                    <Col className="login-panel">
                        <Card className="mt-50">
                            <Card.Header><center>Fuze Project</center></Card.Header>
                            <Card.Body className="pb-5 pr-4 pl-4">
                                <Col className="mb-3 mt-3">
                                    <center>
                                    <h4>Sign In</h4>
                                    <p>Enter your email address and password to access admin panel.</p>
                                    </center>
                                </Col>
                                        <Formik
                                initialValues = {
                                    { 
                                        email: 'test_user@gmail.com', 
                                        password: 'admin1234'
                                    }
                                }
                                onSubmit = {this.login}
                                validationSchema = {
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
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    name="email"
                                                    placeholder="Enter your email address"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isValid={touched.email && !errors.email}
                                                    className={errors.email && touched.email ? 'text-input error' : 'text-input'}/>
                                                    {errors.email && touched.email && (<small className="input-feedback">{errors.email}</small>)}
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row className="mb-3">
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
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Button variant="primary" type="submit" disabled={this.props.loggingIn}>
                                                    Login {this.props.loggingIn && <Spinner animation="border" size="sm"/>}
                                                </Button>
                                            </Col>
                                        </Form.Row>
                                    </Form>
                                )}</Formik>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>);            
        }
    }
}

export default Login;