import React from "react";

import {
    Form,
    Button,
    ButtonToolbar, 
    Card,
    Row,
    Col,
    ListGroup
} from 'react-bootstrap';

import {
    AddCircle,
    Cancel,
    Add
} from '@mui/icons-material';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/** Elements */
import Notifications from "../Elements/Notifications/";


am4core.useTheme(am4themes_animated);

class DashboardContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats : [
                {id:1, bg:"primary"},
                {id:2, bg:"info"},
                {id:3, bg:"success"},
                {id:4, bg:"warning"}
            ],
            charts : [],
            notifications : [
                {
                    title : "This is a sample title ",
                    content : "tempus hendrerit. Nam erat nisl, mattis sit amet blandit in, hendrerit eu nisi.",
                    datetime : "2019-08-13 12:23:13",
                    link : "somelink"
                },
                {
                    title : "This is a sample title 2",
                    content : "Donec porttitor nec risus id placerat. Cras tincidunt malesuada velit.",
                    datetime : "2019-08-23 04:23:13",
                    link : "somelink"
                },
                {
                    title : "This is a sample title",
                    content : "Eget rhoncus enim justo id ante. Quisque aliquam ipsum id commodo ",
                    datetime : "2019-08-30 13:23:13",
                    link : "somelink"
                }
            ]
        }
    }

    componentDidMount() {
        this.lineGraph();
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    miniGraphs = (type, id) => {
        var colors = new am4core.ColorSet();
        switch(type) {

            case "line" :
                this.miniLineGraph(id, "MSFT (Price)", [
                    { "date": new Date(2018, 0, 1, 8, 0, 0), "value": 22 }, 
                    { "date": new Date(2018, 0, 1, 9, 0, 0), "value": 25 }, 
                    { "date": new Date(2018, 0, 1, 10, 0, 0), "value": 40 }, 
                    { "date": new Date(2018, 0, 1, 11, 0, 0), "value": 35 }, 
                    { "date": new Date(2018, 0, 1, 12, 0, 0), "value": 29 }, 
                    { "date": new Date(2018, 0, 1, 13, 0, 0), "value": 1 }, 
                    { "date": new Date(2018, 0, 1, 14, 0, 0), "value": 15 }, 
                    { "date": new Date(2018, 0, 1, 15, 0, 0), "value": 29 }, 
                    { "date": new Date(2018, 0, 1, 16, 0, 0), "value": 33, "opacity": 1 }
                    ], colors.getIndex(1));
                break;

            case "column" :
                this.columnGraph();
                break;

            case "pie" :
                this.pieGraph(id, "", [{
                    "category": "Research",
                    "value": 80,
                    "full": 100
                  }, {
                    "category": "Marketing",
                    "value": 35,
                    "full": 100
                  }, {
                    "category": "Distribution",
                    "value": 92,
                    "full": 100
                  }, {
                    "category": "Human Resources",
                    "value": 68,
                    "full": 100
                  }], colors.getIndex(1));
                break;

            default: break;
        }
    }

    columnGraph = () => {}

    pieGraph = (id, title, data, color) => {
        let chart = am4core.create(id, am4charts.GaugeChart);
        return chart;
    }

    miniLineGraph = (id, title, data, color) => {
        
        let chart = am4core.create(id, am4charts.XYChart);
        chart.width = am4core.percent(45);
        chart.height = 70;

        chart.data = data;

        chart.titles.template.fontSize = 10;
        chart.titles.template.textAlign = "left";
        chart.titles.template.isMeasured = false;
        chart.titles.create().text = title;

        chart.padding(20, 5, 2, 5);

        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.disabled = true;
        dateAxis.renderer.labels.template.disabled = true;
        dateAxis.startLocation = 0.5;
        dateAxis.endLocation = 0.7;
        dateAxis.cursorTooltipEnabled = false;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.cursorTooltipEnabled = false;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineY.disabled = true;
        chart.cursor.behavior = "none";

        var series = chart.series.push(new am4charts.LineSeries());
        series.tooltipText = "{date}: [bold]{value}";
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tensionX = 0.8;
        series.strokeWidth = 2;
        series.stroke = color;

        // render data points as bullets
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.opacity = 0;
        bullet.circle.fill = color;
        bullet.circle.propertyFields.opacity = "opacity";
        bullet.circle.radius = 3;

        return chart;
    }

    lineGraph = () => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

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

        this.chart = chart;
    }
    

    render () {
        return (<div>
            <Row className="mb-3">
                {this.state.stats.map((item, index) => (
                    <Col key={index} lg={3} md={6} sm={12} className="mb-3">
                        <Card bg={item.bg} text="white" className="stats-panel">
                            <Card.Header>Header</Card.Header>
                            <Card.Body>Test</Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="mb-4">
                <Col lg={8} md={6} sm={12} className="mb-3">
                    <Card className="graph-panel">
                        <Card.Header>Chart Sample</Card.Header>
                        <Card.Body>
                            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4} md={6} sm={12} className="mb-3">
                    
                    <Card className="mb-4">
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                    
                    <Notifications panelTitle="Notifications" data={this.state.notifications}/>

                    <Card className="mb-4">
                        <Card.Header>Chart 2</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Item 1</ListGroup.Item>
                            <ListGroup.Item>Item 2</ListGroup.Item>
                            <ListGroup.Item>Item 3</ListGroup.Item>
                        </ListGroup>
                    </Card> 
                </Col>               
            </Row>
        </div>)
    }
}

export default DashboardContent;