import React from "react";

import {
    Form,
    Button,
    ButtonToolbar,
    Card,
    Row,
    Col
} from 'react-bootstrap';

import * as appComponents from '../../../lib/AppComponents';

import { Formik } from 'formik';
import * as Yup from 'yup';

class FormContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.config = {
            form_default: [
                { id: "title", label: "Title", placeholder: "Title", value: "", type: "text", rule: {} },
                { id: "description", label: "Description", placeholder: "Description", value: "", type: "text", rule: {} },
                { id: "Address 1", label: "address1", placeholder: "Address 1", value: "", type: "text", rule: {} },
                { id: "Address 2", label: "address2", placeholder: "Address 2", value: "", type: "text", rule: {} }
            ],
            form_login: [
                { id: "username", label: "Username", placeholder: "Username", value: "", type: "text", rule: {} },
                { id: "password", label: "Password", placeholder: "Password", value: "", type: "password", rule: {} }
            ]
        };
    }

    formSubmitHandler = (values) => {
        console.log(JSON.stringify(values, null, 2));
    }

    componentDidMount = () => {}

    complexFormContent = () => (
        <Card>
            <Card.Header><strong>Form Validation - (Formik + Yup)</strong></Card.Header>
            <Card.Body>
                <Formik
                    initialValues={{ email: '', password: '', cpassword: '', address1: '', address2: '' }}
                    onSubmit={this.formSubmitHandler}
                    validationSchema={
                        Yup.object().shape({
                            email: Yup.string().email().required('Email required'),
                            password: Yup.string().required('Password required'),
                            cpassword: Yup.string().oneOf([Yup.ref('password'), null]).required('Confirm Password required'),
                            address1: Yup.string().required('Address 1 Required')
                        })
                    }>
                    {({
                        handleSubmit, handleChange, handleBlur,
                        values, touched, isValid, errors
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text" name="email"
                                        placeholder="Enter your email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                        className={errors.email && touched.email ? 'text-input error' : 'text-input'} />
                                    {errors.email && touched.email && (<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>)}
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password" name="password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={!!errors.password}
                                        className={errors.password && touched.password ? 'text-input error' : 'text-input'} />
                                    {errors.password && touched.password && (<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>)}
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password" name="cpassword"
                                        placeholder="Confirm Password"
                                        value={values.cpassword}
                                        onChange={handleChange}
                                        isValid={touched.cpassword && !errors.cpassword}
                                        isInvalid={!!errors.cpassword}
                                        className={errors.cpassword && touched.cpassword ? 'text-input error' : 'text-input'} />
                                    {errors.cpassword && touched.cpassword && (<Form.Control.Feedback type="invalid">{errors.cpassword}</Form.Control.Feedback>)}
                                </Form.Group>
                            </Row>

                            <Form.Group controlId="formGridAddress1" className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    placeholder="eg. 1234 Main St" type="text" name="address1"
                                    value={values.address1}
                                    onChange={handleChange}
                                    isValid={touched.address1 && !errors.address1}
                                    isInvalid={!!errors.address1}
                                    className={errors.address1 && touched.address1 ? 'text-input error' : 'text-input'} />
                                {errors.address1 && touched.address1 && (<Form.Control.Feedback type="invalid">{errors.address1}</Form.Control.Feedback>)}
                            </Form.Group>

                            <Form.Group controlId="formGridAddress2" className="mb-3">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control
                                    placeholder="eg. Apartment, studio, or floor"
                                    type="text" name="address2"
                                    value={values.address2}
                                    onChange={handleChange}
                                    isValid={touched.address2 && !errors.address2}
                                    isInvalid={!!errors.address2}
                                    className={errors.address2 && touched.address2 ? 'text-input error' : 'text-input'} />
                                {errors.address2 && touched.address2 && (<Form.Control.Feedback type="invalid">{errors.address2}</Form.Control.Feedback>)}
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select>
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Row>

                            <Form.Group id="formGridCheckbox" className="mb-3">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>

                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        </Card>
    )

    sampleFormContent = (data, hasTitle, headerTitle, horizontal) => (
        <Card style={{ minHeight: `455px` }}>
            <Card.Header>
                <strong>{headerTitle}</strong>
            </Card.Header>
            <Card.Body>
                {hasTitle && <Card.Title>Special title treatment</Card.Title>}
                <Form>
                    {!horizontal && data.map((item, index) => (
                        <Form.Group key={index} controlId={item.id} className="mb-3">
                            <Form.Label>{item.label}</Form.Label>
                            <Form.Control type={item.type} placeholder={item.placeholder} />
                        </Form.Group>
                    ))}

                    {horizontal && data.map((item, index) => (
                        <Row key={index} className="mb-3">
                            <Form.Label column sm="2">{item.label}</Form.Label>
                            <Col sm="10"><Form.Control type={item.type} placeholder={item.placeholder} /></Col>
                        </Row>
                    ))}

                    {!horizontal && (
                        <ButtonToolbar>
                            <Button className="me-2" variant="primary" size="sm" type="submit">Submit</Button>
                            <Button variant="light" size="sm" type="button">Cancel</Button>
                        </ButtonToolbar>
                    )}

                    {horizontal && (
                        <Row>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit" className="me-2">Submit</Button>
                                <Button variant="light" type="button">Cancel</Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Card.Body>
        </Card>
    )

    render() {
        return (
            <div>
                <Row className="mb-4">
                    <Col lg={7} md={6} sm={12} className="mb-3">
                        <h2 className="content-title">Horizontal Form</h2>
                        <p>A sample horizontal oriented.</p>
                        {this.sampleFormContent(this.config.form_default, true, 'Horizontal Form', true)}
                    </Col>
                    <Col lg={5} md={6} sm={12}>
                        <h2 className="content-title">Normal Form</h2>
                        <p>A sample normal oriented.</p>
                        {this.sampleFormContent(this.config.form_default, false, 'Normal Form', false)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className="content-title">Complex Form with Validation</h2>
                        <p>Form with validation.</p>
                        {this.complexFormContent()}
                    </Col>
                </Row>
            </div>
        );
    }
}

export const getMenuItems = () => ({
    menuItems: [
        {
            label: 'Forms',
            component: appComponents.FORMS,
            subMenu: [
                { label: 'Mixins', component: appComponents.FORMS, parent: appComponents.FORMS },
                { label: 'Data Driven', component: appComponents.COMPLEX_FORMS, parent: appComponents.FORMS },
                { label: 'Form Wizard', component: appComponents.FORM_WIZARD, parent: appComponents.FORMS }
            ]
        }
    ],
    componentGroup: [
        appComponents.FORMS,
        appComponents.COMPLEX_FORMS,
        appComponents.FORM_WIZARD
    ]
});

export default FormContent;
