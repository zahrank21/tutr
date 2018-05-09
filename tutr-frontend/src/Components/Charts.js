import React from 'react';
import PropTypes from 'prop-types';


import {Bar, Doughnut, Line, Pie, HorizontalBar} from 'react-chartjs-2'


class Charts extends React.Component{

    constructor(props){
      super(props);


      this.graphColorizer = () => {
        let colors = ['pink', 'blue', 'orange', 'grey', 'lightblue', 'darkblue', 'red']
        let colorsArray = []
        let i
        for (i=0; i < Object.keys(this.props.data).length; i++){
          if (i >= colors.length){
            colorsArray.push(colors[i % colors.length])
            console.log(i % colors.length)
          } else {
            colorsArray.push(colors[i])
          }
        }
        return colorsArray
      }

      let sortedData = Object.keys(this.props.data).map(key => {
        return [key, this.props.data[key]];
      }).sort();

      let reducedSortedData = sortedData.reduce((a, b) => {
         a[b[0]] = b[1];
         return a;
      }, {});

      this.state = {
        chartData: {
          labels: Object.keys(reducedSortedData),
          datasets: [{
            label: props.title,
            data: Object.values(reducedSortedData),
            backgroundColor: this.graphColorizer(),
            borderWidth: 1,
            borderColor: 'grey',
            hoverBorderWidth: 3,
            hoverBorderColor: 'black'
          }]
        }
      }
    }

    renderChart = () => {
      if (this.props.type === 'Bar'){
        return(
          <div className='chart'>
            <Bar
              data={this.state.chartData}
              options={{
                maintainAspectRatio: true,
                scales: {
                 yAxes: [{
                   ticks: {
                     beginAtZero: true
                   }
                 }]
                }
              }}
            />
          </div>
        )
      } else {
        return (
          <div className='chart'>
            <HorizontalBar
              data={this.state.chartData}
              options={{
                maintainAspectRatio: true,
                scales: {
                 xAxes: [{
                   ticks: {
                     beginAtZero: true
                   }
                 }]
                }
              }}
            />
          </div>
        )
      }
    }




    render(){
      return(
        <div>
          {this.renderChart()}
        </div>
      )
    }
}

export default Charts;
