import React from "react";
import {
    Toast
} from 'react-bootstrap';
import {
    Info,
    WarningTwoTone,
    ErrorTwoTone,
    CheckCircleTwoTone
} from '@material-ui/icons';

class Alert extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data : []
        };

        console.debug('Alert', this.props.data);
    }

    componentDidUpdate(prevProps, prevState){
        console.debug('Alert Component', {
            props : this.props.data,
            prev_props : prevProps,
            state : this.state,
            prev_state : prevState
        });

        if(prevProps.data != this.props.data) {
            if(this.props.data?.id && !this.alertExists(this.props.data.id)) {
                let alerts = [...this.state.data];
                let alert = this.props.data;
                alerts.push({
                    id : alert.id,
                    show : true,
                    timeout : 5000,
                    persist : true,
                    title : alert.title,
                    content : alert.content,
                    type: alert.type
                });

                this.setState({
                    data : alerts
                });
            }
        }

        console.log(this.state.data);
    }

    alertExists = (id) => {
        let t = [...this.state.data];
        let exist = false;

        t.forEach((item, index) => {
            if(item?.id && item.id === id) {
                exist = true;
            }
        });

        return exist;
    }

    onAlertClose = (id) => {
        let t = [...this.state.data];
        let closed = -1;

        t.forEach((item, index) => {
            if(item?.id && item.id === id && item.show) {
                t[index].show = false;
            }
        });
        
        this.setState({
            data : t
        });

        //TODO : Nuke closed alerts
    }

    alertTpl = (data, index) => {
        return (<Toast 
                    autohide 
                    key={index} 
                    onClose={()=>{this.onAlertClose(data.id)}} 
                    show={data.show} 
                    delay={data.timeout}                     
                    className={data.type}>
            <Toast.Header>
                {data.type == 'info' && <Info className="mr-3"/>}
                {data.type == 'warning' && <WarningTwoTone className="mr-3"/>}
                {data.type == 'success' && <CheckCircleTwoTone className="mr-3"/>}
                {data.type == 'danger' && <ErrorTwoTone className="mr-3"/>}
                <strong className="mr-auto">{data.title}</strong>
                <small>just now</small>
            </Toast.Header>
            <Toast.Body>{data.content}</Toast.Body>
        </Toast>)
    }

    render() {
        let alert = [];

        if(this.state.data.length > 0) {
            this.state.data.forEach((a,i) => {
                alert.push(this.alertTpl(a,i));
            });
        }

        return(<div
            style={{
                width: '350px',
                position: 'absolute',
                top: '70px',
                right: '20px',
                zIndex: 1000
            }}>{alert || ""}</div>)
    }
}

export default Alert;