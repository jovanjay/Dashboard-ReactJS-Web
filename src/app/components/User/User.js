import React from 'react';
import {
    Row,
    Col,
    Card,
    Image,
    Button,
    Alert,
    Form,
    Table,
    ListGroup,
    Badge
} from 'react-bootstrap';
import {
    Settings,
    Search
} from '@mui/icons-material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Fields from '../Elements/Forms/Fields';
import * as MockData from '../../lib/AppMakeData'

class User extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isEdit : false
        };

        let form = [];

        let data = MockData.PersonData(50);
        let selData = data.map((o,i)=>{return {'label' : o.firstName, 'value' : o.id}});
        let typeAheadData = data.map((o,i)=>{return o.firstName + " " + o.lastName});

        // data driven form        

        this.editForm = [
            [
                {
                    key : 1,
                    handle : "first_name",
                    label : "First Name",
                    placeholder: "First Name",
                    col : {
                        lg : 6,
                        md : 12,
                        sm : 12
                    },
                    value : "Jovan",
                    type : "text",
                    data : [],
                    validation : Yup.string().required('First Name is required')
                },
                {
                    key : 2,
                    handle : "last_name",
                    label : "Last Name",
                    placeholder: "Last Name",
                    col : {
                        lg : 6,
                        md : 12,
                        sm : 12
                    },
                    value : "",
                    type : "text",
                    data : [],
                    validation : Yup.string().required('Last Name is required')
                }
            ],
            [                
                {
                    key : 4,
                    handle : "bio",
                    label : "Bio",
                    placeholder: "Tell something about yourself ...",
                    col : {
                        lg : 12,
                        md : 12,
                        sm : 12
                    },
                    value : "",
                    rows : 5,
                    type : "textarea",
                    data : [],
                    validation : Yup.string()
                }
            ],
            [
                {
                    key : 3,
                    handle : "age",
                    label : "Age",
                    placeholder: "Age",
                    col : {
                        lg : 6,
                        md : 12,
                        sm : 12
                    },
                    value : "",
                    type : "number",
                    data : [],
                    validation : Yup.number()
                },
                {
                    key : 5,
                    handle : "email",
                    label : "Email",
                    placeholder: "",
                    col : {
                        lg : 6,
                        md : 12,
                        sm : 12
                    },
                    value : "",
                    type : "text",
                    data : [],
                    validation : Yup.string().email('Invalid Email').required('Email required')
                }
            ],
            [
                {
                    key : 7,
                    handle : "address_1",
                    label : "Address 1",
                    placeholder: "eg. 1234 Main St.",
                    col : {
                        lg : 12,
                        md : 12,
                        sm : 12
                    },
                    value : "",
                    type : "text",
                    data : [],
                    validation : Yup.string().required('Address required')
                },
                {
                    key : 8,
                    handle : "address_2",
                    label : "Address 2",
                    placeholder: "eg. Apartment, Studio, or floor",
                    col : {
                        lg : 12,
                        md : 12,
                        sm : 12
                    },
                    value : "",
                    type : "text",
                    data : [],
                    validation : Yup.string()
                }
            ],
            [
                {
                    key : 9,
                    handle : "city",
                    label : "City",
                    placeholder: "",
                    col : {
                        lg : 4,
                        md : 12,
                        sm : 12
                    },
                    value : "",
                    type : "text",
                    data : [],
                    validation : Yup.string().required('City required')
                },
                {
                    key : 10,
                    handle : "state",
                    label : "State",
                    placeholder: "",
                    col : {
                        lg : 4,
                        md : 12,
                        sm : 12
                    },
                    value : "",
                    type : "select",
                    data : [
                        {label:"Victoria",value:"vic"},
                        {label:"Northern Territory",value:"ntc"},
                        {label:"Queensland",value:"qld"},
                        {label:"New South Wales",value:"nsw"},
                        {label:"Western Australia",value:"wa"},
                        {label:"South Australia",value:"sa"}
                    ],
                    validation : Yup.string().required('State required')
                },
                {
                    key : 11,
                    handle : "postal",
                    label : "Postal Code",
                    placeholder: "",
                    col : {
                        lg : 4,
                        md : 12,
                        sm : 12
                    },
                    value : "",
                    type : "text",
                    data : [],
                    validation : Yup.string().required('Postalcode required')
                }
            ]
        ];
    }

    edit = () => {
        let isEdit = this.state.isEdit; 
        this.setState({
            isEdit : !isEdit
        });
    }

    submitHandler = (data) => {
        console.debug('User Form Submit', data);
    }

    mainUserCard = () => {
        
        let formKey = 0;
        let initVal = {}
        let validation = {};

        this.editForm.map((o,i) => {
            o.map((f,g)=>{
                initVal[f.handle] = f.value;
                if(!!f.validation)
                    validation[f.handle] = f.validation;
            }); 
            return true;
        });

        return (<>
    <Row className="mb-4">
        <Col lg={3} md={5} sm={12}>
            <Row>
                <Col lg={12} className="mb-4">                
                    <Card className="mb-4 pt-4">
                        <Card.Body className="p-4 user-profile">
                            <center>
                                <Image src="http://www.jovanjay.com/img/me.jpg?1632809820" width="200px" roundedCircle className="mb-3"/>
                                <h4 className="font-11">Jovan</h4>
                                <h5 class="font-9 text-muted">Web Applications Engineer</h5>
                            </center>
                            <div class="text-start mt-5">
                                <h4 class="font-9 text-uppercase text-muted">About Me :</h4>
                                <p class="text-muted font-9 mb-3">
                                    Hi I'm Jovan, A Full Stack Web Applications Developer, with an in-depth knowledge in Open Source Web Based Applications.
                                </p>
                                <hr/>
                                <p class="text-muted mb-2 font-9">
                                    <strong>Full Name :</strong> <span class="ms-2">Jovan Jay M. Villamor</span>
                                </p>

                                <p class="text-muted mb-2 font-9">
                                    <strong>Mobile :</strong> <span class="ms-2">0421 226 781</span>
                                </p>

                                <p class="text-muted mb-2 font-9">
                                    <strong>Email :</strong> <span class="ms-2">jovan.jay.v@gmail.com</span>
                                </p>

                                <p class="text-muted mb-2 font-9">
                                    <strong>Location :</strong> <span class="ms-2">Melbourne, Australia</span>
                                </p>
                            </div>              
                            <Button variant="light" className="float-end" onClick={()=>{this.edit()}}><Settings/></Button>
                        </Card.Body>
                    </Card>
                    <Alert variant="info" className="mb-4">
                        <Alert.Heading>Hey, nice to see you</Alert.Heading>
                        <p>
                            Aww yeah, you successfully read this important alert message. This example
                            text is going to run a bit longer so that you can see how spacing within an
                            alert works with this kind of content.
                        </p>
                    </Alert>
                    <Card>
                        
                        <ListGroup variant="flush" className="p-2">
                            <ListGroup.Item><h4 class="header-title mb-3">Messages</h4></ListGroup.Item>
                            <ListGroup.Item><Image src="https://via.placeholder.com/40" roundedCircle className="float-start me-3"/> Cras justo odio<br/><span className="text-muted">Hi There!</span></ListGroup.Item>
                            <ListGroup.Item><Image src="https://via.placeholder.com/40" roundedCircle className="float-start me-3"/>Dapibus ac facilisis in<br/><span className="text-muted">Hi There!</span></ListGroup.Item>
                            <ListGroup.Item><Image src="https://via.placeholder.com/40" roundedCircle className="float-start me-3"/>Morbi leo risus<br/><span className="text-muted">Hi There!</span></ListGroup.Item>
                            <ListGroup.Item><Image src="https://via.placeholder.com/40" roundedCircle className="float-start me-3"/>Porta ac consectetur ac<br/><span className="text-muted">Hi There!</span></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Col>
        <Col lg={9} md={7} sm={12} className="mb-4">
            { !this.state.isEdit && <Row className="mb-4">
                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Body>Test</Card.Body>
                    </Card>
                </Col>

                <Col lg={4} className="mb-4">
                    <Card>
                        <Card.Body>
                            <i class="dripicons-basket float-end text-muted"></i>
                            <h6 class="text-muted text-uppercase mt-0">Orders</h6>
                            <h2 class="m-b-20">1,587</h2>
                            <Badge bg="primary"> +11% </Badge> <span className="text-muted">From previous period</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className="mb-4">
                    <Card>
                        <Card.Body>                        
                            <i class="dripicons-box float-end text-muted"></i>
                            <h6 class="text-muted text-uppercase mt-0">Revenue</h6>
                            <h2 class="m-b-20">$<span>46,782</span></h2>
                            <Badge bg="danger"> -29% </Badge> <span className="text-muted">From previous period</span>                                            
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} className="mb-4">
                    <Card>
                        <Card.Body>
                            <i class="dripicons-jewel float-end text-muted"></i>
                            <h6 class="text-muted text-uppercase mt-0">Product Sold</h6>
                            <h2 class="m-b-20">1,890</h2>
                            <Badge bg="primary"> +89% </Badge> <span className="text-muted">Last year</span>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={12} className="mb-4">
                    <Card>
                        <Card.Body className="p-4">
                            <div class="table-responsive">
                                <h3 class="font-13">My Purchases</h3>
                                <Table striped hover size="lg" className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Amount</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ASOS Ridley High Waist</td>
                                            <td>$79.49</td>
                                            <td><Badge bg="primary">82 Pcs</Badge></td>
                                            <td>$6,518.18</td>
                                            <td><Button variant="outline-secondary" size="sm" className="float-end font-5"><Search/></Button></td>
                                        </tr>
                                        <tr>
                                            <td>Marco Lightweight Shirt</td>
                                            <td>$128.50</td>
                                            <td><Badge bg="primary">37 Pcs</Badge></td>
                                            <td>$4,754.50</td>
                                            <td><Button variant="outline-secondary" size="sm" className="float-end font-5"><Search/></Button></td>
                                        </tr>
                                        <tr>
                                            <td>Half Sleeve Shirt</td>
                                            <td>$39.99</td>
                                            <td><Badge bg="primary">64 Pcs</Badge></td>
                                            <td>$2,559.36</td>
                                            <td><Button variant="outline-secondary" size="sm" className="float-end font-5"><Search/></Button></td>
                                        </tr>
                                        <tr>
                                            <td>Lightweight Jacket</td>
                                            <td>$20.00</td>
                                            <td><Badge bg="primary">184 Pcs</Badge></td>
                                            <td>$3,680.00</td>
                                            <td><Button variant="outline-secondary" size="sm" className="float-end font-5"><Search/></Button></td>
                                        </tr>
                                        <tr>
                                            <td>Marco Shoes</td>
                                            <td>$28.49</td>
                                            <td><Badge bg="primary">69 Pcs</Badge></td>
                                            <td>$1,965.81</td>
                                            <td><Button variant="outline-secondary" size="sm" className="float-end font-5"><Search/></Button></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>}

            {this.state.isEdit && <Row className="mb-4">
            <Col lg={12} >
                <Card>
                <Card.Body className="p-4">
                        <Formik
                            initialValues = {initVal}
                            onSubmit = {this.submitHandler}
                            validationSchema = {Yup.object().shape(validation)}>
                            {
                                ({
                                    handleSubmit,
                                    handleChange,
                                    handleReset,
                                    handleBlur,
                                    values,
                                    touched,
                                    isValid,
                                    errors
                                }) => (<Form noValidate onSubmit={handleSubmit}>
                                        {this.editForm.map((o, i) => {                                        
                                            let form = {};
                                            if(o.length > 0) {
                                                form = o.map((f,g)=>(
                                                    ((f.type === "text" || f.type === "number")  && <Fields.FormDefault
                                                            key={f.key}
                                                            index={f.key}
                                                            fieldObj={f} 
                                                            values={values} 
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            touched={touched}
                                                            isValid={isValid}
                                                            errors={errors}
                                                            />) ||
                                                        (f.type === 'select' && <Fields.FormSelect
                                                            key={f.key}
                                                            index={f.key}
                                                            fieldObj={f} 
                                                            values={values} 
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            touched={touched}
                                                            isValid={isValid}
                                                            errors={errors}
                                                            />) ||
                                                        (f.type === 'textarea' && <Fields.FormTextarea
                                                            key={f.key}
                                                            index={f.key}
                                                            fieldObj={f} 
                                                            values={values} 
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            touched={touched}
                                                            isValid={isValid}
                                                            errors={errors}
                                                            />) ||
                                                        (f.type === 'type-ahead' && <Fields.FormTypeAhead
                                                            key={f.key}
                                                            index={f.key}
                                                            fieldObj={f} 
                                                            values={values} 
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            touched={touched}
                                                            isValid={isValid}
                                                            errors={errors}
                                                            />) ||
                                                        (f.type === 'radio' && <Fields.FormRadio
                                                            key={f.key}
                                                            index={f.key}
                                                            fieldObj={f} 
                                                            values={values} 
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            touched={touched}
                                                            isValid={isValid}
                                                            errors={errors}
                                                            />) ||
                                                        (f.type === 'checkbox' && <Fields.FormCheckbox
                                                            key={f.key}
                                                            index={f.key}
                                                            fieldObj={f} 
                                                            values={values} 
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            touched={touched}
                                                            isValid={isValid}
                                                            errors={errors}
                                                            />)
                                                ));
                                            }
                                            return <Row key={i}>{form}</Row>;
                                        })}
                                        <Form.Group as={Col} className="mb-3">
                                            <Button variant="primary" type="submit" className="me-3">
                                                Submit
                                            </Button>
                                            <Button variant="light" type="button" onClick={handleReset}>
                                                Reset
                                            </Button>
                                            <Button variant="light" type="button" className="float-end" onClick={()=>{this.edit()}}>
                                                Cancel
                                            </Button>
                                        </Form.Group>
                                        <Form.Group>
                                            <Alert variant="danger">
                                                <pre>
                                                    <code>
                                                        Errors : {JSON.stringify(errors,null,2)}
                                                    </code>
                                                </pre>
                                            </Alert>                                    
                                        </Form.Group>
                                    </Form>)
                            }
                        </Formik>
                    </Card.Body>
                </Card>
                </Col>
            </Row>}
        </Col>        
    </Row></>);
    }

    render() {
        return (<>
            {this.mainUserCard()}
        </>)
    }
}

export default User;