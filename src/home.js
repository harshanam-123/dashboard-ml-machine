import React, {  useEffect, useState } from 'react';
import './home.css';
// import ChartGraph from './components/chart';
// import ApexCharts from 'apexcharts';
// import  ChartViewer from './components/realtime';
// import SampleComponet from './components/samplecomponet';
// import SampleApexChart from './components/sampleapexchart';
import ChartSample02 from './components/chartsample02';


// class Home extends Component{

//     constructor(props){
//         super(props);

//         this.state = {
//             counter: 0,
//             x_acc_val: 0,
//             // options: {
//             //   chart: {
//             //     id: "basic-bar"
//             //   },
//             //   xaxis: {
//             //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
//             //   }
//             // },
//             // series: [
//             //   {
//             //     name: "series-1",
//             //     data: [30, 40, 45, 50, 49, 60, 70, 91]
//             //   }
//             // ]
//           };
        
//         console.log("hi people !", props.name, props.counter);
//     }

//     // componentDidMount() {
        
//         // window.setInterval(() => {

//         //     fetch('http://ec2-44-202-34-123.compute-1.amazonaws.com:3000/dataset/current_values')
//         //     .then(res =>{
//         //     if(!res.ok){
//         //         throw Error('clound not fetch the data from the server')
//         //     }
//         //     return res.json();
//         //     })
//         //     .then(data =>{
                
//         //         console.log(data)
//         //         this.setState({
//         //             counter: data.count,
//         //             x_acc_val: ((0 | (parseFloat(data.acceleration_x) *10000)) /10000)
//         //         })
            
//         //     })
//         //     .catch(err => {
//         //     console.log(err);
        
//         //     })
            
//         //     console.log(this.props.counter);
//         //     this.setState({
//         //         name: this.props.name ,
//         //         counter: this.props.counter
//         //     });
//         //     console.log(this.props.nameOfProp);

//         //   }, 4000)
//     //   }

// render(){
// return(
//     <div className="home">
//         <div className="chart" id='chart'>
//             {/* <SampleComponet name="josh" counter={counter}/> */}
//             <SampleApexChart 
//                 options={this.state.options}
//                 series={this.state.series}
//                 type="bar"
//                 width="500"/>
//         </div>
//     </div>
// )}
// }
// export default Home


const Home = (props) => {
    
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
            
            
            fetch('http://ec2-44-202-34-123.compute-1.amazonaws.com:3000/dataset/current_values')
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

    <ChartSample02 
                   
                    // series={this.state.series}
                    data={data_1}
                    counter={counter}
                    width="500"/>

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



