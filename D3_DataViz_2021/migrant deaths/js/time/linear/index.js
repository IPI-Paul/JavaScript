import React from 'react';
import ReactDOM from 'react-dom';
import { scaleTime, scaleLinear, timeFormat, extent } from 'd3';
import { useMigrantData } from '../../../../_data/migrant deaths/useMigrantData';
import { AxisBottom } from '../../AxisBottom';
import { AxisLeft } from '../../AxisLeft';
import { Marks } from '../Marks';

let data;
const width = window.innerWidth - 10;
const height = window.innerHeight - 40;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 55;
const circleRadius = 2;
const tickOffset = 10;

const App = () => {  
  data = data ? data : useMigrantData();
  
  if(!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d['Reported Date'];
  const xAxisLabel = 'Reported Date';

  const yValue = d => d['Total Dead and Missing'];
  const yAxisLabel = 'Total Dead and Missing';

  const xAxisTickFormat = timeFormat('%b-%Y');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom 
          xScale={xScale} innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat} 
          tickOffset={tickOffset}
        />
        <AxisLeft 
          yScale={yScale} 
          innerWidth={innerWidth} 
          tickOffset={tickOffset}
        />
        <text 
          x={innerWidth / 2} 
          y={innerHeight + xAxisLabelOffset} 
          textAnchor="middle"
          className="axis-label"
        >
          {xAxisLabel}
        </text>
        <text 
          textAnchor="middle"
          className="axis-label" 
          transform={
            `translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`
          }
        >
          {yAxisLabel}
        </text>
        <Marks 
          data={data} 
          xScale={xScale} 
          yScale={yScale} 
          xValue={xValue} 
          yValue={yValue} 
          tooltipFormat={xAxisTickFormat} 
          circleRadius={circleRadius} 
        />
      </g>
    </svg>
  )
};

window.App = App;
window.rootElement = document.getElementById('root');
document.title = 'Migrant Deaths/Missing - Working with Time';
ReactDOM.render(<App />, rootElement);