import React, {  useEffect, useState } from 'react';
import './home.css';
// import ChartGraph from './components/chart';
// import ApexCharts from 'apexcharts';
// import  ChartViewer from './components/realtime';
// import SampleComponet from './components/samplecomponet';
// import SampleApexChart from './components/sampleapexchart';
import ChartSample02 from './components/chartsample02';
import ScartterChart from './components/scatterchart';

const Home = () => {
    
    var count1 = 0;
    var lasttime = 9 ;

    var server_count = 0 ;
    var previouse_server_count = 0;
    var x_acc_val = 0;
    
    const[data_1, set_data_1] = useState(data)
    const[counter, set_counter] = useState(0)

    
    function getNewSeries(starttime, x_val) {
        var newtime = starttime + 1;
        lasttime = newtime
        console.log("new updated is - ", newtime);
      

        for(var i = 0; i< data.length - 10; i++) {
            console.log("data.length - ", data.length)
          // IMPORTANT
          // we reset the x and y of the data which is out of drawing area
          // to prevent memory leaks
          data[i].x = newtime - 1 - 10 ; //- XAXISRANGE - TICKINTERVAL
        //   data[i].y = 0
          
        }
        
        
       
        data.push({
          x: newtime,
          y: x_val
        // y: Math.floor(Math.random() * (90 - 10 + 1)) + 10
        });
        
        
        
      } ;

      function resetData(){
        // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
        data = data.slice(data.length - 100, data.length);
      }

    useEffect(()=>{
       const interval = setInterval(() => {
       
            // console.log("Time out happens !")
            
            
            fetch('http://ec2-52-87-214-88.compute-1.amazonaws.com:3000/dataset_1/predicted_val')
            .then(res =>{
            if(!res.ok){
                throw Error('clound not fetch the data from the server')
            }
            return res.json();
            })
            .then(data =>{
                
                
                   x_acc_val = ((0 | (parseFloat(data.acceleration_x) *10000)) /10000)
                   server_count = data.count
                   console.log("x val is - ", x_acc_val)
            
            })
            .catch(err => {
            console.log(err);
        
            })

            console.log('count from server - ', server_count)
            if (server_count != previouse_server_count)
           
                count1 = count1 +1 ;
                set_counter(count1);

                // console.log("x val is - ", x_acc_val)
                getNewSeries(lasttime, x_acc_val);
                set_data_1(data)
                previouse_server_count = server_count;

            

       
        }, 3000);

        return () => {
            window.clearInterval(interval); // clear the interval in the cleanup function
          };


    }, [])
   

return(

    <div className="main-wrap">
        <div className="line-chart">
        <ChartSample02 
                   
                   // series={this.state.series}
                   data={data_1}
                   counter={counter}
                   width="500"/>
        </div>

        <div className="scatter-chart">
            <ScartterChart 
                // data_plot_healthy={data_plot_healthy}
                // data_plot_unhealthy={data_plot_unhealthy}
                />
        </div>
    </div>
   

)
}
export default Home



var data = [
    {
        "x": 1,
        "y": 0
    },
    {
        "x": 2,
        "y": 0.1
    },
    {
        "x": 3,
        "y": 0.2
    },
    {
        "x": 4,
        "y": 0.3
    },
    {
        "x": 5,
        "y": 0.4
    },
    {
        "x": 6,
        "y": 0.5
    },
    {
        "x": 7,
        "y": 0.6
    },
    {
        "x": 8,
        "y": 0.7
    },
    {
        "x": 9,
        "y": 0.8
    },
    {
        "x": 10,
        "y": 0.9
    }
]



