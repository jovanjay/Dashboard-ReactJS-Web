import React from 'react';

/** Core */
import {
    Card
} from 'react-bootstrap';

class CardPanel extends React.Component {
    
    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            title : (this.props.data && this.props.data.title) ? this.props.data.title : 'Title',
            body : (this.props.data && this.props.data.body) ? this.props.data.body : 'Body Content',
            footer : (this.props.data && this.props.data.footer) ? this.props.data.footer : 'Footer'
        }
    }

    render(){
        return(<div><Card>
                <Card.Header>{this.state.title}</Card.Header>
                <Card.Body>{this.state.body}</Card.Body>
                <Card.Footer>{this.state.footer}</Card.Footer>
            </Card></div>)
    }
}

export default CardPanel;