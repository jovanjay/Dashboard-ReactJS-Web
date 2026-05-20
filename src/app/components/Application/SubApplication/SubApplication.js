import React from 'react';

import CardPanel from '../components/CardPanel';
class SubApplication extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            data : {
                title : 'Sub Application',
                body : 'this content is from sub location',
                footer : 'some footer'
            }
        }
    }
    
    componentDidMount () {
        // console.log('Application Component mounted');
        console.debug('SubApplication did mount', {
            data : this.state
        });        
        this.onLoadActions();
    }

    componentWillUnmount () {
        // console.log('SubApplication Component unmounted');
        console.debug('SubApplication Will Unmount', {
            data : this.state
        });
    }

    componentDidUpdate() {}
    
    onLoadActions = () => {
        console.debug('Sub Application Loaded', {
            data : this.state,
            props : this.props
        });
    };

    render(){
        return(<div>Sub Application<CardPanel data={this.state.data}/></div>)
    }
}

export default SubApplication;