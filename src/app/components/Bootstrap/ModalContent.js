import React from "react";

import {
    Row,
    Col,
    Card,
    Modal,
    Button,
    Alert,
    Dropdown,
    Table
} from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actionTypes from '../../lib/AppActionTypes';
import ComplexFormContent from '../Bootstrap/Forms/ComplexFormContent';

class ModalContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show : false,
            size : 'sm',
            fullscreen : false,
            title : 'Modal',
            centered : false,
            customWidth : 'modal-90w',
            content : 'simple',
            formData : null,
            style : {
                position : 'absolute',
                display : 'none'
            },
            contextShow : false
        };

        this.buttonsBasic = [
            {
                title : "Small Modal",
                fullscreen : false,
                size : "sm",
                custom : false,
                centered : false,
                content : false
            },
            {
                title : "Large Modal",
                fullscreen : false,
                size : "lg",
                custom : false,
                centered : false,
                content : false
            },
            {
                title : "Custom Width Modal",
                fullscreen : false,
                size : "lg",
                custom : "modal-90w",
                centered : false,
                content : false
            },
            {
                title : "Centered Modal",
                fullscreen : false,
                size : "lg",
                custom : false,
                centered : true,
                content : false
            }
        ];

        this.contextMenu = React.createRef();
    }

    componentDidMount () {
        this.contextMenu.current.focus();
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        console.debug('Modal Content Updated',{
            props : this.props,
            prevProps : prevProps,
            state : this.state,
            prevState : prevState
        });
    }

    componentWillUnmount () {
        this.props.reset();
    }

    showModal = (title, fullscreen, size, custom, centered, content) => {
        
        let s = {
            show : true,
            title : title,
            centered : centered,
            customWidth : custom,
            content : (content)?content:'simple'
        };

        if(typeof size === 'string') {
            s.size = size;
        } else if(!size) {
            s.fullscreen = fullscreen;
            s.size = false;
        }

        this.setState(s);
    }

    hideModal = () => {
        this.setState({
            show : false
        });
    }

    modal = () => {
        return(<Modal
            size={this.state.size}
            show={this.state.show}
            dialogClassName={this.state.customWidth}
            centered={this.state.centered}
            onHide={() => this.hideModal()}>                
                {this.state.title != '' && <Modal.Header><Modal.Title>
                    {this.state.title}
                </Modal.Title></Modal.Header>}
                <Modal.Body>{this.modalContent()}</Modal.Body>
        </Modal>)
    }

    modalContent = () => {
        return (<>
            {this.state.content == 'simple' && <Row><Col>...</Col></Row>}
            {this.state.content == 'form' && <Row><Col><ComplexFormContent onSubmit={this.modalActions}/></Col></Row>}
        </>)
    }

    modalActions = (data) => {
        this.setState({
            formData : data,
            show : false
        });
    }

    contextMenuTpl = () => {
        return (<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu" style={this.state.style} onFocus={()=>{console.log('Context Focus')}} onBlur={()=>{this.contextMenuHide()}}>                    
                    <li><a tabindex="-1" href="#" class="dropdown-item">Action</a></li>
                    <li><a tabindex="-1" href="#" class="dropdown-item">Another action</a></li>
                    <li><a tabindex="-1" href="#" class="dropdown-item">Something else here</a></li>
                    <li class="dropdown-divider"><a href="#" ref={this.contextMenu}></a></li>
                    <li><a tabindex="-1" href="#" class="dropdown-item">Separated link</a></li>
            </ul>)
    }

    contextMenuHide = () => {
        console.log('Context Blur');
        this.setState({
            contextShow : false,
            style : {
                display : 'none'
            }
        });
    }

    contextMenuActions = (e) => {
        e.preventDefault();
        
        const xPos = e.pageX;
        const yPos = e.pageY;

        console.debug('Context Menu',{
            x : xPos,
            y : yPos
        });

        this.setState({
            contextShow : true,
            style : {
                position: 'absolute',
                display : 'block',
                top : yPos,
                left : xPos,
                opacity : 1
            }
        }, () => {
            this.contextMenu.current.focus();
        });
    }

    render () {
        return(<>
            {this.modal()}
            {this.contextMenuTpl()}
            <Row>
                <Col lg={12} className="mb-5">                    
                    <h2 className="content-title">Basic Modal</h2>
                    <p>A simple modal implementation.</p>
                    {this.buttonsBasic.map((o,i)=>(
                        <Button key={i} className="mr-3" onClick={()=>{this.showModal(o.title, o.fullscreen, o.size, o.custom, o.centered, o.content)}}>{o.title}</Button>
                    ))}
                </Col>
                <Col lg={12} className="mb-5">
                    <h2 className="content-title">Complex Modal</h2>
                    <p>A complex modal implementation with dynamic components contents.</p>
                    <Button className="mr-3" onClick={()=>{this.showModal("",false, "lg", false, false, 'form')}}>Modal with Form</Button>
                    {this.state.formData && <Alert key={5} variant="secondary" className="mt-4">
                        <pre>
                            <code>
                                Form Data : {JSON.stringify(this.state.formData, null, 2)}
                            </code>
                        </pre>
                    </Alert>}
                </Col>
                <Col lg={12} className="mb-5">
                    <h2 className="content-title">Alert</h2>
                    <p>Application alert can be called on any component via state dispatch.</p>                        
                    <Button variant="danger" className="mr-3" onClick={()=>{this.props.prompt('danger')}}>Show Alert</Button>
                    <Button variant="warning" className="mr-3" onClick={()=>{this.props.prompt('warning')}}>Show Alert</Button>
                    <Button variant="success" className="mr-3" onClick={()=>{this.props.prompt('success')}}>Show Alert</Button>
                    <Button variant="info" className="mr-3" onClick={()=>{this.props.prompt('info')}}>Show Alert</Button>
                </Col>
                <Col lg={6}>
                    <h2 className="content-title">Context Menu</h2>
                    <p></p>
                    <Card>
                        <Table as="Card.Body" striped responsive hover size="md">
                            <thead>
                                <th>Col 1</th>
                                <th>Col 2</th>
                                <th>Col 3</th>
                            </thead>
                            <tr onContextMenu={this.contextMenuActions}>
                                <td>some data 1</td>
                                <td>some data 2</td>
                                <td>some data 3</td>
                            </tr>
                            <tr onContextMenu={this.contextMenuActions}>
                                <td>some data 1</td>
                                <td>some data 2</td>
                                <td>some data 3</td>
                            </tr>
                            <tr onContextMenu={this.contextMenuActions}>
                                <td>some data 1</td>
                                <td>some data 2</td>
                                <td>some data 3</td>
                            </tr>
                        </Table>    
                    </Card>
                </Col>
        </Row></>)
    }
}

/** Constants */
const prompt = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type : actionTypes.ALERT,
            data : {
                id : 'modal_alert_' + Math.floor(Math.random() * 10000),
                title : 'Alert from Modal',
                content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum libero est, placerat eu felis vel',
                type : data
            }
        });
    }
}

const reset = () => {    
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.ALERT, //use to fire the default on swith block
            data : {}
        });
    }
}

const mapStateProps = state => ({
    alert : state.commonReducer.get('alert')
});

const mapDispatchToProps = dispatch => ({
    prompt : (data) => dispatch(prompt(data)),
    reset : () => dispatch(reset())
});

export default connect(mapStateProps, mapDispatchToProps)(ModalContent);
