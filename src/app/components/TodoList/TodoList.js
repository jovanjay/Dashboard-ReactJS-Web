import React from 'react';

import {
    ListGroup,
    Form,
    Row,
    Col,
    Button,
    InputGroup,
    Spinner,
    Alert,
    Card
} from 'react-bootstrap';

import {
    Edit,
    Delete,
    MoreVert,
    Clear,
    AddSharp
} from '@mui/icons-material';

import { Formik } from 'formik';
import * as Yup from 'yup';

import * as Fields from '../Elements/Forms/Fields';

class TodoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todoList: [],
            action: 'new',
            data: {}
        };

        this.form = [
            { id: "task_id", label: "", placeholder: "", handle: "id", value: "", type: "hidden", rule: {} },
            { id: "order", label: "", placeholder: "", value: 0, handle: "order", type: "hidden", rule: {} },
            { id: "task", label: "", placeholder: "Task", handle: "task", value: "", type: "text", rule: {} },
            { id: "index", label: "", placeholder: "", value: 0, handle: "index", type: "hidden", rule: {} }
        ];
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let s;

        window.debug && console.debug('Todolist Updated', {
            props: this.props,
            prevProps: prevProps,
            state: this.state,
            prevState: prevState
        });

        if (!prevProps.isLoaded && !this.props.isLoaded
            && !this.props.isLoading && this.props.data?.app_data?.success) {
            this.props.load();
        }

        if (this.props.data?.tasks?.length > 0 && !this.props.error
            && this.props.isLoaded && prevProps.data.tasks !== this.props.data.tasks) {
            s = { todoList: this.props.data.tasks };
        }

        if (prevProps.isSaved !== this.props.isSaved && !this.props.isSaving) {
            let t = [...this.state.todoList];
            if (t.length > 0) {
                if (this.props.data.index > -1) {
                    let x = this.props.data.index;
                    t[x].id = this.props.data.id;
                    t[x].task = this.props.data.task;
                    t[x].order = this.props.data.order;
                    t[x].created_at = this.props.data.created_at;
                    t[x].updated_at = this.props.data.updated_at;
                    t[x].index = this.props.data.index;
                    t[x].isEdit = false;
                }
            } else {
                t.push(this.props.data);
            }
            s = { todoList: t };
        }

        if (prevProps.isDeleted !== this.props.isDeleted && !this.props.isDeleting) {
            let t = [...this.state.todoList];
            if (this.state.action === 'new') {
                t.splice(this.props.data.index, 1);
            } else {
                t[this.props.data.index].isEdit = false;
            }
            s = { todoList: t };
        }

        window.debug && console.debug('Todolist State', { s });

        if (s) {
            this.setState(s);
        }
    }

    componentWillUnmount() {
        window.debug && console.debug('Todolist Unmounted', { props: this.props, state: this.state });
        this.props.reset();
    }

    componentDidMount() {
        window.debug && console.debug('Todolist Mounted', { props: this.props, state: this.state });

        if (!this.props.isInitializing && !this.props.isInitialized) {
            window.debug && console.log('Todolist Initialize...');
            this.props.init();
        }
    }

    deleteItem = (o, i) => {
        this.props.action({ task: o, index: i }, 'remove');
    }

    editItem = (o, i) => {
        let t = [...this.state.todoList];
        for (let x = 0; x < t.length; x++) {
            if (t[x].isEdit) { t[x].isEdit = false; }
        }
        t[i].isEdit = true;
        this.setState({ action: 'update', todoList: t });
    }

    addNew = () => {
        let t = [...this.state.todoList];
        for (let x = 0; x < t.length; x++) {
            if (t[x].isEdit) { t[x].isEdit = false; }
        }
        t.push({ id: "", order: t.length - 1, task: "", isEdit: true });
        this.setState({ action: 'new', todoList: t });
    }

    submitHandler = (formData) => {
        this.props.action(formData, 'save');
    }

    todoForm = (todo, i) => {
        let index = i;
        let initVal = { id: todo.id, task: todo.task, order: todo.order, index };

        let validation = {};
        this.form.forEach((o) => {
            if (!!o.validation) { validation[o.handle] = o.validation; }
        });

        return (
            <Formik
                initialValues={initVal}
                onSubmit={this.submitHandler}
                validationSchema={Yup.object().shape(validation)}>
                {({
                    handleSubmit, handleChange, handleReset, handleBlur,
                    values, touched, isValid, errors
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <InputGroup>
                            {this.form.map((o, i) => (
                                (o.type === 'text' &&
                                    <Form.Control
                                        key={i}
                                        autoFocus={true}
                                        type={o.type}
                                        name={o.handle}
                                        placeholder={o.placeholder}
                                        value={values[o.handle]}
                                        onChange={handleChange}
                                        isValid={touched[o.handle] && !errors[o.handle]}
                                        isInvalid={!!errors[o.handle]}
                                        className={errors[o.handle] && touched[o.handle] ? 'text-input error' : 'text-input'} />
                                ) ||
                                (o.type === 'hidden' && <Fields.FormHidden
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
                            <Button variant="light" type="button" onClick={() => { this.deleteItem(null, index); }} className="todolist-remove-item"><Clear /></Button>
                        </InputGroup>
                    </Form>
                )}
            </Formik>
        );
    }

    todoDisplay = (o, i) => {
        if (o.isEdit) {
            return this.todoForm(o, i);
        } else {
            return (
                <Row className="todolist-content">
                    <Col lg={10} md={10} sm={10}>
                        <MoreVert className="float-start" />
                        <span>{o.task}</span>
                    </Col>
                    <Col lg={2} md={2} sm={2}>
                        <Button variant="light" type="button" size="sm" className="float-end" onClick={() => { this.deleteItem(o, i); }}><Delete style={{ fontSize: 20 }} /></Button>
                        <Button variant="light" type="button" size="sm" className="float-end me-1" onClick={() => { this.editItem(o, i); }}><Edit style={{ fontSize: 20 }} /></Button>
                    </Col>
                </Row>
            );
        }
    }

    render() {
        return (
            <Row>
                <Col lg={12}>
                    <Alert variant="info">
                        <Alert.Heading>TODO List (CRUD) Application</Alert.Heading>
                        <p>A simple TODO application that uses RESTful web services to a remote server.</p>
                    </Alert>
                    {this.props.isLoading && (
                        <Card>
                            <Card.Body>
                                <center>
                                    <Spinner animation="border" variant="secondary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </center>
                            </Card.Body>
                        </Card>
                    )}
                    {!this.props.isLoading && (
                        <ListGroup className="todolist">
                            {this.state.todoList.length > 0 && this.state.todoList.map((o, i) => (
                                <ListGroup.Item key={i} draggable={true} className={o.isEdit ? 'todolist-edit' : ''}>
                                    {this.todoDisplay(o, i)}
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item className="todolist-add d-grid gap-2 p-0">
                                <Button variant="light" type="button" className="btn-100w pt-3 pb-4" onClick={() => { this.addNew(); }}><AddSharp className="float-start" /></Button>
                            </ListGroup.Item>
                        </ListGroup>
                    )}
                </Col>
            </Row>
        );
    }
}

export default TodoList;
