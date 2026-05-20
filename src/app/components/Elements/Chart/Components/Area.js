import React from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { length } from "@amcharts/amcharts4/.internal/core/utils/Iterator";

class Area extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type : this.props.type,
            config : {
                height : this.props.config.height,
                width : this.props.config.width
            },
            data : [],
            chart : {},
            chartId : "cid-" + Math.random().toString(16).slice(2)
        }
    }
    
    componentDidMount() {        
        console.debug('Area Chart Init', this.state);
    }

    componentDidMount() {
        this.chartArea();
    }

    componentDidUpdate(prevProps, prevState){

        console.debug('Area Graph State', {
            prev_props :prevProps,
            prev_state : prevState,
            this_props : this.props,
            this_state : this.state,
        });

        if(prevProps.data !== this.props.data) {
            this.setState({
                data : this.props.data
            });
        }
    }

    componentWillUnmount() {
        if (this.state.chart) {
            
            console.debug('Area Chart Dispose', {
                state : this.state,
                props : this.props
            });

            this.state.chart.dispose();
        }
    }

    chartArea = () => {
        let chart = am4core.create(this.state.chartId, am4charts.XYChart);

        chart.paddingRight = 20;

        chart.preloader.label.text = 'Loading';

        //move data from caller
        let data = [];
        let visits = 10;
        for (let i = 1; i < 366; i++) {
            visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }
        chart.data = data;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";

        series.tooltipText = "{valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;        

        this.setState({
            chart : chart
        });
    }

    render () {        
        return (<div>
            <div id={this.state.chartId} style={{ width: this.state.config.width, height: this.state.config.height }}></div>
        </div>)
    }
}

export default Area;