import React from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleBand, scaleLinear, max } from 'd3';

const csvUrl = 'http://localhost:8080/SourceFiles/csv/UN_Population_2019.csv';
let data;
let it = 0;
const width = window.innerWidth - 10;
const height = window.innerHeight - 40;

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

  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, height]);

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, width]);

  return (
    <svg width={width} height={height}>
      {data.map(d => 
      <rect 
        x={0} 
        y={yScale(d.Country)}  
        width={xScale(d.Population)} 
        height={yScale.bandwidth()} 
      />)}
    </svg>
  )
};
const rootElement = document.getElementById('root');
document.title = 'Pathetic Bar Chart';
ReactDOM.render(<App />, rootElement);