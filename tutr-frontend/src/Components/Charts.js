import React from 'react';
import PropTypes from 'prop-types';


import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2'


class Charts extends React.Component{

    constructor(props){
      super(props);

      this.state = {
        chartData: {
          labels: ['Instagram', 'Facebook', 'Reddit', 'LinkedIn', 'Twitter', 'Tumblr', 'Google Plus'],
          datasets: [{
            label: 'Monthly Active Users',
            data: [800000000, 2130000000, 250000000, 106000000, 330000000, 115000000, 111000000],
            backgroundColor: ['pink', 'blue', 'orange', 'grey', 'lightblue', 'darkblue', 'red'],
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
              maintainAspectRatio: true
            }}
          />
        </div>
      )
    }
}

export default Charts;
