import React from "react";

import {
    Form,
    Button,
    Card,
    Col,
    Alert
} from 'react-bootstrap';

import { Formik } from 'formik';
import * as Yup from 'yup';

import * as Fields from '../../Elements/Forms/Fields';
import * as MockData from '../../../lib/AppMakeData'

class ComplexFormContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form : [],
            data : {}
        }

        let form = [];

        let data = MockData.PersonData(50);
        let selData = data.map((o,i)=>{return {'label' : o.firstName, 'value' : o.id}});
        let typeAheadData = data.map((o,i)=>{return o.firstName + " " + o.lastName});

        // data driven form
        form.push({
            handle : "title",
            label : "Title",
            placeholder: "Title",
            rowGroup : 'g1',
            value : "",
            type : "text",
            data : [],
            validation : Yup.string().required('Required'),
            onChange : () => {console.log('Type title')}
        });

        form.push({
            handle : "description",
            label : "Description",
            placeholder: "eg. This is a sample test",
            rowGroup : 'g1',
            value : "",
            type : "textarea",
            data : [],
            validation : Yup.string().required('Description required'),
            onChange : () => {console.log('Type description')}
        });

        form.push({
            handle : "type",
            label : "Type",
            placeholder: "Select Type",
            rowGroup : 'g2',
            value : "",
            type : "select",
            data : selData,
            validation : Yup.string().required('Type required'),
            onChange : () => {console.log('Type select')}
        });

        form.push({
            handle : "users",
            label : "Users (TypeAhead)",
            placeholder: "Select Users",
            rowGroup : 'g2',
            value : "",
            type : "type-ahead",
            data : typeAheadData,
            validation : Yup.array().required('Users required'), 
            onChange : () => {console.log('Type users')}
        });

        form.push({
            handle : "cb",
            label : "Some Checkbox",
            placeholder: "",
            rowGroup : 'g3',
            value : "",
            type : "checkbox",
            data : [],
            onChange : () => {console.log('Type checkbox')}
        });

        form.push({
            handle : "rb",
            label : false,
            placeholder: "",
            rowGroup : 'g3',
            value : "",
            type : "radio",
            data : [
                {value: 1, label: 'Option 1'},
                {value: 2, label: 'Option 2'},
                {value: 3, label: 'Option 3'}
            ],
            inline : true,
            validation : Yup.string().required('Radio required'),
            onChange : () => {console.log('Type radio button')}
        });

        this.config = {
            form : form
        };
    }
    
    componentDidMount () {}

    submitHandler = (data) => {
        this.setState({
            data : data
        });

        this.props.onSubmit(data);
    }

    formRenderer = () => {

        var initVal = {}
        var validation = {};

        this.config.form.map((o,i) => {
            initVal[o.handle] = o.value;
            if(!!o.validation)
                validation[o.handle] = o.validation;
                
            return true;
        });

        return (<div>                
                <h2 className="content-title">Data driven Form with Validation</h2>
                <p>A sample form built with json data.</p>
                <Card>
                <Card.Header><strong>Data Driven Form - (Formik + Yup)</strong></Card.Header>
                <Card.Body>
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
                                    {this.config.form.map((o, i) => (
                                        (o.type === "text" && <Fields.FormDefault
                                            key={i}
                                            index={i} 
                                            fieldObj={o} 
                                            values={values} 
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            touched={touched}
                                            isValid={isValid}
                                            errors={errors}
                                            />) ||
                                        (o.type === 'select' && <Fields.FormSelect
                                            key={i}
                                            index={i} 
                                            fieldObj={o} 
                                            values={values} 
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            touched={touched}
                                            isValid={isValid}
                                            errors={errors}
                                            />) ||
                                        (o.type === 'textarea' && <Fields.FormTextarea
                                            key={i}
                                            index={i} 
                                            fieldObj={o} 
                                            values={values} 
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            touched={touched}
                                            isValid={isValid}
                                            errors={errors}
                                            />) ||
                                        (o.type === 'type-ahead' && <Fields.FormTypeAhead
                                            key={i}
                                            index={i} 
                                            fieldObj={o} 
                                            values={values} 
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            touched={touched}
                                            isValid={isValid}
                                            errors={errors}
                                            />) ||
                                        (o.type === 'radio' && <Fields.FormRadio
                                            key={i}
                                            index={i} 
                                            fieldObj={o} 
                                            values={values} 
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            touched={touched}
                                            isValid={isValid}
                                            errors={errors}
                                            />) ||
                                        (o.type === 'checkbox' && <Fields.FormCheckbox
                                            key={i}
                                            index={i} 
                                            fieldObj={o} 
                                            values={values} 
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            touched={touched}
                                            isValid={isValid}
                                            errors={errors}
                                            />)
                                    ))}
                                    <Form.Group as={Col} className="mb-3">
                                        <Button variant="primary" type="submit" className="mr-3">
                                            Submit
                                        </Button>
                                        <Button variant="light" type="button" onClick={handleReset}>
                                            Reset
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
                <Card.Footer>
                    <pre>
                        <code>
                            Data : {JSON.stringify(this.state.data,null,2)}
                        </code>
                    </pre>
                </Card.Footer>
            </Card></div>)
    }
    
    render () {
        return(this.formRenderer())
    }
}

export default ComplexFormContent;