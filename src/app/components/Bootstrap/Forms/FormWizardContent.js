import React from "react";

import {
    Form,
    Button,
    Card,
    Col,
    Carousel,
    Alert
} from 'react-bootstrap';

import { Formik } from 'formik';
import * as Fields from '../../Elements/Forms/Fields';
import * as Yup from 'yup';
import * as MockData from '../../../lib/AppMakeData'

class FormWizardContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form : [],
            current : 0,
            hasNext : true,
            hasBack : true,
            formData : []
        }

        //constant
        let data = MockData.PersonData(1000);
        let selData = data.map((o,i)=>{return {'label' : o.firstName, 'value' : o.id}});
        let typeAheadData = data.map((o,i)=>{return o.firstName + " " + o.lastName});

        let stepsData = [];

        stepsData[0] = [];
        stepsData[1] = [];
        stepsData[2] = [];

        stepsData[0].push({
            handle : "title",
            label : "Title",
            placeholder: "Title",
            stepGroup : 's1',
            value : "",
            type : "text",
            data : [],
            validation : Yup.string().required('Title required'),
            onChange : () => {console.log('Type title')}
        });

        stepsData[0].push({
            handle : "description",
            label : "Description",
            placeholder: "eg. This is a sample test",
            stepGroup : 's1',
            value : "",
            type : "textarea",
            data : [],
            validation : Yup.string().required('Description required'),
            onChange : () => {console.log('Type description')}
        });

        stepsData[1].push({
            handle : "type",
            label : "Type",
            placeholder: "Select Type",
            stepGroup : 's2',
            value : "",
            type : "select",
            data : selData,
            validation : Yup.string().required('Type required'),
            onChange : () => {console.log('Type select')}
        });

        stepsData[1].push({
            handle : "number",
            label : "Some number",
            placeholder: "Number",
            stepGroup : 's2',
            value : "",
            type : "number",
            data : [],
            validation : null,
            onChange : () => {console.log('Type number')}
        });

        stepsData[2].push({
            handle : "users",
            label : "Users",
            placeholder: "Select Users",
            stepGroup : 's3',
            value : "",
            type : "type-ahead",
            data : typeAheadData,
            validation : Yup.array().required('Users required'),
            onChange : () => {console.log('Type users')}
        });

        this.formFieldData = stepsData;
    }

    componentDidMount() {}

    formItem (fields) {
        
        var initVal = {}
        var validation = {};

        fields.map((o,i) => {
            initVal[o.handle] = o.value;
            if(!!o.validation)
                validation[o.handle] = o.validation;
        
            return true;
        });

        return(<Formik
            initialValues = {initVal}
            onSubmit = {(data) => this.submitHandler(data)}
            validationSchema = {Yup.object().shape(validation)}
            >
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
                        {fields.map((o, i) => (
                            ((o.type === "text" || o.type === "number")  && <Fields.FormDefault
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
                        <Form.Group as={Col}>
                            <Button variant="light" type="button" className="float-start me-1" onClick={() => {this.processStep('back')}}>back</Button>
                            <Button variant="light" type="button" className="float-end" onClick={handleReset}>Reset</Button>
                            <Button variant="success" type="submit" className="float-end me-1">{(this.state.current < (this.formFieldData.length-1)) ? 'Proceed' : 'Submit'}</Button>
                        </Form.Group>
                    </Form>)
            }
        </Formik>);
    }

    stepItem (obj, index) {
        
        let desc = [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt maximus.",
            "Nulla scelerisque, risus et lacinia hendrerit, felis risus venenatis sem, vitae hendrerit dolor ipsum ut libero quam vel vulputate. Nunc aliquet erat vel sollicitudin imperdiet.",
            "Vivamus nec finibus mi. Nunc quis ligula sollicitudin, vestibulum tortor eget, gravida massa."
        ];

        return(<Carousel.Item key={index}>
                <Col className="mb-4">
                    <Alert key={index} variant="primary">
                        <strong>Step {index+1} : </strong> {desc[index]}
                    </Alert>
                </Col>
                {(this.formItem(obj))}
            </Carousel.Item>)
    }

    processStep (action) {

        let current = this.state.current;
        let new_current = current;

        //process action
        if(action === 'proceed') {
            new_current = (current < this.formFieldData.length) ? current + 1 : this.formFieldData.length - 1;
        } else if (action === 'back') {
            new_current = (current > 1) ? current - 1 : 0;
        }

        console.log(new_current);
        this.setState({
            current : new_current
        });
    }
    
    submitHandler (formData) {

        let current = this.state.current;
        let data = [...this.state.formData];
        data[current] = formData;
        
        this.setState({
            formData : data
        });

        if(current < (this.formFieldData.length - 1)) {
            this.processStep('proceed');
        }
    }

    onFormChange (formData) {
        console.log(formData);
    }

    render() {
        return(<div>
            <h2 className="content-title">Form Wizard</h2>
            <p>A simple form wizard with validation.</p>
            <Card>
                <Card.Header><strong>Form Wizard - (Formik + Yup)</strong></Card.Header>
                <Carousel
                    className="form-wizard pb-4 pt-4"
                    as={Card.Body} 
                    activeIndex={this.state.current} 
                    fade={true}
                    slide={false}
                    touch={false}
                    indicators={false}
                    keyboard={false}
                    controls={false}
                    onSelect={this.onFormChange}>
                    {this.formFieldData.map((o,i)=>(
                        this.stepItem(o,i)
                    ))}
                </Carousel>
                <Card.Footer>
                    <pre>
                        <code>
                            Data : {JSON.stringify(this.state.formData,null,2)}
                        </code>
                    </pre>
                </Card.Footer>
            </Card>
        </div>)
    }
}

export default FormWizardContent;