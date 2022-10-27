import React from 'react';
import ReactDOM from 'react-dom';
import { scaleBand, scaleLinear, max } from 'd3';
import { useData } from '../../../../_data/population/useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from '../AxisLeft';
import { Marks } from '../Marks';

let data;
const width = window.innerWidth - 10;
const height = window.innerHeight - 40;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const App = () => {  
  if(!data) {
    useData()
      .then(response => {
        data = response
        ReactDOM.render(<App />, rootElement);
      });
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const yValue = d => d.Country;
  const xValue = d => d.Population;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue} 
        />
      </g>
    </svg>
  )
};
const rootElement = document.getElementById('root');
document.title = 'Refactored Bar Chart';
ReactDOM.render(<App />, rootElement);