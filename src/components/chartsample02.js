import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React, { Component, useEffect, useState } from 'react' ;
import equal from 'fast-deep-equal'
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts';

var atonece = false;
var counter = 0 ;

var lastTime = 0;
var data = [] ;
var time = []
var TICKINTERVAL = 1; // 1 day in ms (milli seconds)
let XAXISRANGE = 777600000;


function initDataSeriesByTime(starttime, count) {

    var i = 0;
    while (i < count) {
      var x = starttime;
      var y = (i/10);
  
      data.push({
        x, y
      });
     
      lastTime = starttime
      starttime += TICKINTERVAL;
      i++;
    }
  
    console.log("init data var is - ", data.slice());
  }
  

class ChartSample02 extends Component{
    constructor(props){
        super(props)
        this.updateCounter = this.updateCounter.bind(this);
        this.state = {
            name: "josh",
            couter: 3,

            series: [{
                data: this.props.data.slice()
              }],
              options: {
                chart: {
                  id: 'realtime',
                  height: 350,
                  type: 'line',
                  animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                      speed: 3000
                    },
                    
                  },
                  toolbar: {
                    show: false
                  },
                  zoom: {
                    enabled: false
                  }
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  curve: 'smooth'
                },
                title: {
                  text: 'Dynamic Updating Chart',
                  align: 'left',
                  
                },
                markers: {
                    size: 4,
                    strokeWidth: 0,
                    hover: {
                      size: 9
                    }
                },
                
                xaxis: {
                  type: 'numeric',
                  range: 10,
                 
                },
              
                yaxis: {
                  max: 1
                },
                legend: {
                  show: false
                },
              },
        }
    }

    componentDidMount(props){
        

       
    };

    componentDidUpdate(prevProps){

       if(!equal(this.props, prevProps)){

           this.updateCounter();
       }

    }

    updateCounter(){
        
        console.log("data_1 is - ", this.props.data);
        this.setState({
                couter: this.props.counter,
                series: [{
                    data: this.props.data.slice()
                  }],

            })

    }


    componentWillUnmount() {
        clearInterval(this.interval);
      };

    
    render()
        {
            return(
                <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>
            )
        }
    




}

export default ChartSample02

