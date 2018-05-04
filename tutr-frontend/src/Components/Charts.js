import React from 'react';
import PropTypes from 'prop-types';


import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2'


class Charts extends React.Component{

    constructor(props){
      super(props);


      this.graphColorizer = () => {
        let colors = ['pink', 'blue', 'orange', 'grey', 'lightblue', 'darkblue', 'red']
        let colorsArray = []
        let i
        console.log(Object.keys(this.props.data).length)
        for (i=0; i < Object.keys(this.props.data).length; i++){
          colorsArray.push(colors[Math.floor(Math.random() * colors.length)])
        }
        return colorsArray
      }
      this.state = {
        chartData: {
          labels: Object.keys(this.props.data),
          datasets: [{
            label: props.title,
            data: Object.values(this.props.data),
            backgroundColor: this.graphColorizer(),
            borderWidth: 1,
            borderColor: 'grey',
            hoverBorderWidth: 3,
            hoverBorderColor: 'black'
          }]
        }
      }
    }

    render(){
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
    }
}

export default Charts;
