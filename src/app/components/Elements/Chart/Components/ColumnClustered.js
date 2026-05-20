import React from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { length } from "@amcharts/amcharts4/.internal/core/utils/Iterator";

class ColumnClustered extends React.Component {

    static chartXAxis = {};

    constructor(props) {
        super(props);
        this.state = {
            type : this.props.type,
            config : {
                height : this.props.config.height,
                width : this.props.config.width
            },
            data : {},
            chart : {},
            chartId : "cid-" + Math.random().toString(16).slice(2)
        }
    }
    
    componentDidMount() {        
        console.debug('Chart Column Clustered Init', this.state);        
    }

    componentDidMount() {
        this.chartColumn();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        console.debug('Column Clustered Graph State', {
            prev_props :prevProps,
            prev_state : prevState,
            this_props : this.props,
            this_state : this.state,
        });

        if(prevState.chart !== this.state.chart) {
            this._chartColumnSeries('first', 'The First');
            this._chartColumnSeries('second', 'The Second');
            this._chartColumnSeries('third', 'The Third');
        }
    }

    componentWillUnmount() {
        if (this.state.chart) {
            console.debug('Chart Column Clustered Dispose', this.state);
            this.state.chart.dispose();
        }
    }
    
    chartColumn = () => {

        let indicator;
        let chart = am4core.create(this.state.chartId, am4charts.XYChart);

        chart.colors.step = 2;

        indicator = chart.tooltipContainer.createChild(am4core.Container);
        
        indicator.background.fill = am4core.color("#fff");
        indicator.background.fillOpacity = 0.8;
        indicator.width = am4core.percent(100);
        indicator.height = am4core.percent(100);

        let indicatorLabel = indicator.createChild(am4core.Label);
        indicatorLabel.text = "Loading...";
        indicatorLabel.align = "center";
        indicatorLabel.valign = "middle";
        indicatorLabel.fontSize = 20;
        
        indicator.show();

        chart.events.on('ready', () => {
            indicator.hide();
        });

        let data = [];
        let max = 100;
        for (let i = 1; i < 5; i++) {
            data.push({ 
                category: "Place #" + i,
                first: Math.floor(Math.random() * max),
                second: Math.floor(Math.random() * max),
                third : Math.floor(Math.random() * max)
            });
        }
        chart.data = data;

        chart.legend = new am4charts.Legend()
        chart.legend.position = 'top'
        chart.legend.paddingBottom = 20
        chart.legend.labels.template.maxWidth = 95

        let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        xAxis.dataFields.category = 'category'
        xAxis.renderer.cellStartLocation = 0.1
        xAxis.renderer.cellEndLocation = 0.9
        xAxis.renderer.grid.template.location = 0;

        this.chartXAxis = xAxis;

        let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.min = 0;

        this.setState({
            chart : chart
        });
    }

    _chartColumnSeries = (value, name) => {
        let chart = this.state.chart;

        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name    
        
        series.events.on("hidden", this._chartColumnArrange);
        series.events.on("shown", this._chartColumnArrange);
    
        var bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 30;
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#ffffff')
    
        return series;
    }

    _chartColumnArrange = () => {
        let chart = this.state.chart;
        let chartXAxis = this.chartXAxis;

        let series = chart.series.getIndex(0);

        let w = 1 - chartXAxis.renderer.cellStartLocation - (1 - chartXAxis.renderer.cellEndLocation);
        if (series.dataItems.length > 1) {
            let x0 = chartXAxis.getX(series.dataItems.getIndex(0), "categoryX");
            let x1 = chartXAxis.getX(series.dataItems.getIndex(1), "categoryX");
            let delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                let middle = chart.series.length / 2;
    
                let newIndex = 0;
                chart.series.each(function(series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    }
                    else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                let visibleCount = newIndex;
                let newMiddle = visibleCount / 2;
    
                chart.series.each(function(series) {
                    let trueIndex = chart.series.indexOf(series);
                    let newIndex = series.dummyData;
    
                    let dx = (newIndex - trueIndex + middle - newMiddle) * delta
    
                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }

    render () {
        return (<div><div id={this.state.chartId} style={{ width: this.state.config.width, height: this.state.config.height }}></div></div>)
    }
}

export default ColumnClustered;