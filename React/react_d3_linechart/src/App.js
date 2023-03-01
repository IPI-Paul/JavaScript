// import logo from './logo.svg';
import './App.css';
import Data from './components/Data';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function App() {
  const [inialData, width, height, padding, maxValue] = 
    [Data, 500, 150, 20, 20];
  const [chartData, setChartData] = useState(inialData)
  const newData = () => chartData.map(d => {
      d.value = Math.floor(Math.random() * (maxValue + 1)) 
      return d
    }
  );
  const svgRef = useRef();

  useEffect(
    () => {
      const xScale = 
        d3
          .scalePoint()
          .domain(chartData.map(d => d.name))
          .range([(0 + padding), (width - padding)]);
      
      const yScale = 
        d3
          .scaleLinear()
          .domain([0, d3.max(chartData, (d) => (d.value))])
          .range([(height - padding), padding]);
      
      const line = 
        d3
          .line()
          .x(d => xScale(d.name))
          .y(d => yScale(d.value))
          .curve(d3.curveMonotoneX);
      
      d3
        .select(svgRef.current)
        .select('path')
        .attr('d', () => line(chartData))
        .attr('fill', 'none')
        .attr('stroke', 'white');

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      d3
        .select('#x-axis')
          .remove()
    
      d3
        .select(svgRef.current)
        .append('g')
          .attr('transform', `translate(0, ${height - padding})`)
          .attr('id', 'x-axis')
        .call(xAxis)

      d3
      .select('#y-axis')
        .remove()
    
      d3
        .select(svgRef.current)
        .append('g')
          .attr('transform', `translate(${padding}, 0)`)
          .attr('id', 'y-axis')
        .call(yAxis)
    } 
  )

  return (
    <div className="App">
      <header className="App-header">
        <svg id='chart' ref={svgRef} viewBox='0 0 500 150'>
          <path d='' fill='none' stroke='white' strokeWidth={1} />
        </svg>
        <p>
          <button onClick={() => setChartData(newData())}>
            Click to refresh data
          </button>
        </p>
      </header>
    </div>
  );
};

export default App;
