import React from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleBand, scaleLinear, max } from 'd3';

const csvUrl = 'http://localhost:8080/SourceFiles/csv/UN_Population_2019.csv';
let data;
let it = 0;
const width = window.innerWidth - 10;
const height = window.innerHeight - 40;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

const getData = () => {
  if(it == 0) {
    it = 1;
    const row = d => {
      d.Population = +d['2020'];
      return d;
    };
    csv(csvUrl, row).then(data => {
      setData(data.slice(0, 10));
    });
  } else {
    it = 0;
  }
};

const setData = (dta) => {
  data = dta;
  ReactDOM.render(<App />, document.getElementById('root'));
}

const App = () => {
  getData();

  if(!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map(d => 
        <rect 
          x={0} 
          y={yScale(d.Country)}  
          width={xScale(d.Population)} 
          height={yScale.bandwidth()} 
        />)}
      </g>
    </svg>
  )
};
const rootElement = document.getElementById('root');
document.title = 'Margin Convention';
ReactDOM.render(<App />, rootElement);