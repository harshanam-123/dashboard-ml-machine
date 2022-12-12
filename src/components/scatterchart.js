

import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React, { Component, useEffect, useState } from 'react' ;
import equal from 'fast-deep-equal'
import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts';


var data_plot_healthy = [];
var data_plot_unhealthy = [];

class ScartterChart extends Component{
    constructor(props){
        super(props)

        this.state = {
            series: [{
            name: "unHealthy",
            // data: this.props.data_plot_healthy
            data:data_plot_unhealthy
           }
          ,{
            name: "Healthy",
            // data: this.props.data_plot_unhealthy
            data: data_plot_healthy
          }
            ],


          options:{
            chart: {
                height: 350,
                type: 'scatter',
                zoom: {
                  enabled: true,
                  type: 'xy'
                }
              },
              xaxis: {
                tickAmount: 10,
                labels: {
                  formatter: function(val) {
                    return parseFloat(val).toFixed(1)
                  }
                }
              },
              yaxis: {
        
                tickAmount: 10,
                min: 0,
                max: 1,
                labels: {
                  formatter: function(val) {
                    return val.toFixed(2)
                  }
                }
              },

              markers:{
                size: 5
              }

              


            }
            
          };

    }

    componentDidMount(){
        
      console.log('componentDidMount() lifecycle of parent called');
       
    };

    componentDidUpdate(prevProps){
      if(!equal(this.props, prevProps)){

        this.updateSeries();
    }
      
    }

    updateSeries = ()=>{
        
      // console.log("data_1 is - ", this.props.data_plot_healthy);
     
      fetch('http://ec2-52-87-214-88.compute-1.amazonaws.com:3000/dataset_1/values')
    .then(res =>{
    if(!res.ok){
        throw Error('clound not fetch the data from the server')
    }
    return res.json();
    })
    .then(data =>{
        
        
           var data_list = data.data_list

           var data_plot_healthy = [];
           var data_plot_unhealthy= [];


           for(var i=0; i<data_list.length ; i++){
                var single_data_array = data_list[i]
                // if(i == 10){
                //   break ;
                // }

                if (single_data_array[6] == 1){
                  console.log("passing");

                  var temp_plot_passing = [single_data_array[0], single_data_array[1]]
                  data_plot_healthy.push(temp_plot_passing)

                } else if (single_data_array[6] == 0){
                  console.log("failing");
                  var temp_plot_failing = [single_data_array[0], single_data_array[1] ]
                  data_plot_unhealthy.push(temp_plot_failing)
                }

           }

           this.setState({
           
            series: [{
              name: "Healthy",
              // data: this.props.data_plot_healthy
              data:data_plot_unhealthy
             }
            ,{
              name: "Unhealthy",
              // data: this.props.data_plot_unhealthy
              data: data_plot_healthy
            }
              ],

        })

        

            console.log("healthy home is", data_plot_healthy);

        })
        .catch(err => {
        console.log(err);
    
        })
  }

   

    componentWillUnmount() {
        
      };

    
    render()
        {
            return(
                <div id="chart1">
                  <button onClick={this.updateSeries}>Click to Plot</button>
                <ReactApexChart options={this.state.options} series={this.state.series} type="scatter" height={600} width={1000} />
            </div>
            )
        }
    




}

export default ScartterChart

