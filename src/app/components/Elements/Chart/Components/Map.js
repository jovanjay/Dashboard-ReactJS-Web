import React from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geoData from "@amcharts/amcharts4-geodata/worldHigh"
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { length } from "@amcharts/amcharts4/.internal/core/utils/Iterator";

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart : {},
            config : {
                height : this.props.config.height,
                width : this.props.config.width
            },
            chartId : "cid-" + Math.random().toString(16).slice(2)
        }
    }

    componentDidMount() {
        console.debug('Chart Map Init', this.state);        
    }

    componentDidMount() {
      this.chartMap();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

      console.debug('Map Graph State', {
          prev_props :prevProps,
          prev_state : prevState,
          this_props : this.props,
          this_state : this.state,
      });
    }


    componentWillUnmount() {
      if (this.state.chart) {
          console.debug('Chart Map Dispose', this.state);
          this.state.chart.dispose();
      }
    }

    chartMap = () => {

        let indicator;
        let chart = am4core.create(this.state.chartId, am4maps.MapChart);

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

        // Set map definition
        chart.geodata = am4geoData;

        // Set projection
        chart.projection = new am4maps.projections.Mercator();

        // Center on the groups by default
        chart.homeZoomLevel = 6;
        chart.homeGeoPoint = { longitude: 133.7751, latitude: -25.2744 };

        // Polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.exclude = ["AQ"];
        polygonSeries.useGeodata = true;
        polygonSeries.nonScalingStroke = true;
        polygonSeries.strokeOpacity = 0.5;

        // Image series
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        var imageTemplate = imageSeries.mapImages.template;
        imageTemplate.propertyFields.longitude = "longitude";
        imageTemplate.propertyFields.latitude = "latitude";
        imageTemplate.nonScaling = true;

        var image = imageTemplate.createChild(am4core.Image);
        image.propertyFields.href = "imageURL";
        image.width = 50;
        image.height = 30;
        image.horizontalCenter = "middle";
        image.verticalCenter = "middle";

        var label = imageTemplate.createChild(am4core.Label);
        label.text = "{label}";
        label.horizontalCenter = "middle";
        label.verticalCenter = "top";
        label.dy = 20;

        imageSeries.data = [{
            "latitude": -37.8136,
            "longitude": 144.9631,
            "imageURL": "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
            "width": 32,
            "height": 32,
            "label": "Melbourne: 11C"
          }, {
            "latitude": -42.880554,
            "longitude": 147.324997,
            "imageURL": "https://www.amcharts.com/lib/images/weather/animated/thunder.svg",
            "width": 32,
            "height": 32,
            "label": "Hobart: +18C"
          }, {
            "latitude": -33.865143,
            "longitude": 151.209900,
            "imageURL": "https://www.amcharts.com/lib/images/weather/animated/cloudy-day-1.svg",
            "width": 32,
            "height": 32,
            "label": "Sydney: +13C"
          }, {
            "latitude": -31.953512,
            "longitude": 115.857048,
            "imageURL": "https://www.amcharts.com/lib/images/weather/animated/day.svg",
            "width": 32,
            "height": 32,
            "label": "Perth: +22C"
          }, {
            "latitude": -12.462827,
            "longitude": 130.841782,
            "imageURL": "https://www.amcharts.com/lib/images/weather/animated/day.svg",
            "width": 32,
            "height": 32,
            "label": "Darwin: +29C"
          }, {
            "latitude": -20.917574,
            "longitude": 142.702789,
            "imageURL": "https://www.amcharts.com/lib/images/weather/animated/rainy-7.svg",
            "width": 32,
            "height": 32,
            "label": "Queensland: +10C"
          }, {
            "latitude": -16.925491,
            "longitude": 145.754120,
            "imageURL": "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg",
            "width": 32,
            "height": 32,
            "label": "Cairns: +8C"
          } ];

        this.setState({
          chart : chart
        });
    }

    render () {
        return (<div><div id={this.state.chartId} style={{ width: this.state.config.width, height: this.state.config.height }}></div></div>)
    }
}

export default Map;