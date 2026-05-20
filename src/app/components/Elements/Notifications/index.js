import React from "react";
import {
    Card,
    Carousel
} from 'react-bootstrap';


import './style.css';

class Notifications extends React.Component {

    componentDidMount() {
    }

    render() {
        return(<Card className="widget-notifications mb-3">
                <Card.Header>{this.props.panelTitle || "Header Title"}</Card.Header>
                <Card.Body>
                    <Carousel>
                        {this.props.data.map((item, index) => (
                            <Carousel.Item key={index} className="notificationsItem">
                                <Carousel.Caption>
                                    <h4>{item.title}</h4>
                                    <p>{item.content}</p>
                                    <div className="clearfix">
                                        <small className="pull-left">{item.link}</small>
                                        <small className="pull-right">{item.datetime}</small>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Card.Body>
            </Card>)
    }
}

export default Notifications;