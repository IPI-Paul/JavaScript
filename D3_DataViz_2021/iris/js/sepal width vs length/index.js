import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, max, format, extent } from 'd3';
import { useData } from '../../../_data/iris/useData';
import { AxisBottom } from '../AxisBottom';
import { AxisLeft } from '../AxisLeft';
import { Marks } from '../Marks';

let data;
const width = window.innerWidth - 10;
const height = window.innerHeight - 40;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;

const App = () => {  
  if(!data) {
    useData()
      .then(response => {
        data = response;
        ReactDOM.render(<App />, rootElement);
      });
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xValue = d => d.sepal_length;
  const xAxisLabel = 'Sepal Length';

  const yValue = d => d.sepal_width;
  const yAxisLabel = 'Sepal Width';

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom 
          xScale={xScale} innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat} 
          tickOffset={5}
        />
        <AxisLeft 
          yScale={yScale} 
          innerWidth={innerWidth} 
          tickOffset={5}
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
          circleRadius={10}
        />
      </g>
    </svg>
  )
};
const rootElement = document.getElementById('root');
document.title = 'Iris Scatterplot';
ReactDOM.render(<App />, rootElement);