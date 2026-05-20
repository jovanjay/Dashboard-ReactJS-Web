import React from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { length } from "@amcharts/amcharts4/.internal/core/utils/Iterator";

import ColumClustered from "./Components/ColumnClustered";
import Area from "./Components/Area";
import Map from "./Components/Map";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config : this.props.config,
            data : this.props.data,
            isMounted : false
        }        
    }
    
    componentDidMount() {        
        console.debug('Initializing Chart', this.state);

        //amcharts daisy chain
        am4core.options.queue = true;

        this.setState({
            isMounted : true
        });
    }

    componentWillUnmount() {}


    chart = () => {
        if(this.state.isMounted) {
            if(this.props.type == 'bar') {
                return <ColumClustered config={this.props.config}/>
            } else if(this.props.type == 'area') {
                return <Area config={this.props.config}/>
            } else if(this.props.type == 'map') {
                return <Map config={this.props.config}/>
            }
        }
    }

    render () {        
        return (<div>{this.chart()}</div>)
    }
}

export default Chart;