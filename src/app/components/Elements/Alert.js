import React from "react";
import {
    Toast,
    ToastContainer
} from 'react-bootstrap';
import {
    Info,
    WarningTwoTone,
    ErrorTwoTone,
    CheckCircleTwoTone
} from '@mui/icons-material';

class Alert extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.debug('Alert Component', {
            props: this.props.data,
            prev_props: prevProps,
            state: this.state,
            prev_state: prevState
        });

        if (prevProps.data !== this.props.data) {
            if (this.props.data?.id && !this.alertExists(this.props.data.id)) {
                let alerts = [...this.state.data];
                let alert = this.props.data;
                alerts.push({
                    id: alert.id,
                    show: true,
                    timeout: 5000,
                    persist: true,
                    title: alert.title,
                    content: alert.content,
                    type: alert.type
                });
                this.setState({ data: alerts });
            }
        }
    }

    alertExists = (id) => {
        return this.state.data.some(item => item?.id && item.id === id);
    }

    onAlertClose = (id) => {
        let t = [...this.state.data];
        t.forEach((item) => {
            if (item?.id && item.id === id && item.show) {
                item.show = false;
            }
        });
        this.setState({ data: t });
    }

    alertTpl = (data, index) => (
        <Toast
            autohide
            key={index}
            onClose={() => { this.onAlertClose(data.id); }}
            show={data.show}
            delay={data.timeout}
            className={data.type}>
            <Toast.Header>
                {data.type === 'info' && <Info className="me-3" />}
                {data.type === 'warning' && <WarningTwoTone className="me-3" />}
                {data.type === 'success' && <CheckCircleTwoTone className="me-3" />}
                {data.type === 'danger' && <ErrorTwoTone className="me-3" />}
                <strong className="me-auto">{data.title}</strong>
                <small>just now</small>
            </Toast.Header>
            <Toast.Body>{data.content}</Toast.Body>
        </Toast>
    )

    render() {
        return (
            <ToastContainer
                position="top-end"
                style={{ position: 'absolute', top: '70px', right: '20px', zIndex: 1000 }}>
                {this.state.data.map((a, i) => this.alertTpl(a, i))}
            </ToastContainer>
        );
    }
}

export default Alert;
