import React, { useRef, useEffect } from 'react';
import Highcharts from 'highcharts';

const Chart = ({ data }) => {
  const chartRef = useRef(null);

  
  useEffect(() => {
    if (chartRef.current && data) {

        console.log(data, "datos antes del grafico")
      const chart = Highcharts.chart(chartRef.current, {
        chart: {
            plotBackgroundImage: 'https://raw.githubusercontent.com/aledc7/Laravel/master/resources/somatocarta.png',
            renderTo: 'somatocarta',
                defaultSeriesType:'scatter',
                borderWidth:1,
                borderColor:'#ccc',
                marginLeft:90,
                marginRight:50,
        },
    
        title:{
                text:'Somatocarta'
            },
            legend:{
                enabled:false                                
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y;
                }
            },
            plotOptions: {
                series: {
                    shadow:false,
                }
            },
            xAxis:{
                title:{
                    text:'X Axis Title'
                },
                min:-100,
                max:100,
                tickInterval:100,
                tickLength:0,
                minorTickLength:0,
                gridLineWidth:1,
                showLastLabel:true,
                showFirstLabel:false,
                lineColor:'#ccc',
                lineWidth:1                
            },
            yAxis:{
                title:{
                    text:'Y Axis<br/>Title',
                    rotation:0,
                    margin:25,
                },
                min:-100,
                max:100,
                tickInterval:100,
                tickLength:3,
                minorTickLength:0,
                lineColor:'#ccc',
                lineWidth:1        
            },
            series: [{
                color:'#185aa9',
                data: data
            }]
    });
    }
  }, [chartRef, data]);

  return (
    <div ref={chartRef} />
  );
};

export default Chart;




// import { useEffect, useState } from 'react'
// import * as d3 from "d3";


// export default function Chart() {

//     useEffect(() => {
//         const data = [10, 20, 30, 40, 50];
//         const svg = d3.select('#chart')
//           .append('svg')
//           .attr('width', 500)
//           .attr('height', 300);
//         svg.selectAll('rect')
//           .data(data)
//           .enter()
//           .append('rect')
//           .attr('x', (d, i) => i * 70)
//           .attr('y', (d, i) => 300 - 10 * d)
//           .attr('width', 50)
//           .attr('height', (d, i) => d * 10)
//           .attr('fill', 'steelblue');
      
//       });

// return(

//     <div id="chart"></div>
// )

// }
