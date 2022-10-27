import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, format, extent, scaleOrdinal } from 'd3';
import { useData } from '../../../_data/iris/useData';
import { AxisBottom } from '../../../iris/js/AxisBottom';
import { AxisLeft } from '../../../iris/js/AxisLeft';
import { Marks } from '../coloured scatterplot/Marks';
import { Dropdown } from '../useState/Dropdown';
import { useState } from 'ipi';
import { ColorLegend } from './ColorLegend';

let data;
const width = window.innerWidth - 10;
const height = window.innerHeight - 70;
const margin = { top: 20, right: 150, bottom: 65, left: 90 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 40;
const fadeOpacity = 0.2;

const xId = "x-select";
const yId = "y-select";
const attributes = [
  {value: 'sepal_length', label: 'Sepal Length'},
  {value: 'sepal_width', label: 'Sepal Width'},
  {value: 'petal_length', label: 'Petal Length'},
  {value: 'petal_width', label: 'Petal Width'},
  {value: 'species', label: 'Species'}
];

const getLabel = value => {
  for(let i = 0; i < attributes.length; i++) {
    if(attributes[i].value === value) {
      return attributes[i].label;
    }
  }
}

const App = () => {  
  const [hoveredValue, setHoveredValue] = useState({obj: 'hoveredValue', state: null});

  if(!data) {
    useData()
      .then(response => {
        data = response;
        ReactDOM.render(<App />, window.rootElement);
      });
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  let initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState({obj: 'xAttribute', state: initialXAttribute});
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  let initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState({obj: 'yAttribute', state: initialYAttribute});
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  const colorValue = d => d.species;
  const colorLegendLabel = 'Species';
  const circleRadius = 7;

  const filteredData = data.filter(d => hoveredValue === colorValue(d));

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137b80', '#8E6C8A']);

  return (
    <g>
      <div className="menus-container">
        <label for={xId} className="dropdown-label">X</label>
        <Dropdown 
          options={attributes} 
          id={xId}
          selectedValue={xAttribute}
          onSelectedValueChange={(value) => setXAttribute({obj: 'xAttribute', state: value})} 
          className=""
        /> 
        <label for={yId} className="dropdown-label">Y</label>
        <Dropdown 
          options={attributes} 
          id={yId}
          selectedValue={yAttribute}
          onSelectedValueChange={(value) => setYAttribute({obj: 'yAttribute', state: value})}  
        />  
      </div>
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
          <g transform={`translate(${innerWidth + 50}, 60)`}>
            <text 
              x={35} 
              y={-25} 
              textAnchor="middle"
              className="legend-label"
            >
              {colorLegendLabel}
            </text>
            <ColorLegend 
              colorScale={colorScale} 
              tickSpacing={22} 
              tickSize={circleRadius} 
              tickTextOffset={20} 
              onHover={(value) => setHoveredValue({obj: 'hoveredValue', state: value})}  
              hoveredValue={hoveredValue} 
              fadeOpacity={fadeOpacity}
            />
          </g> 
          <g opacity={hoveredValue ? fadeOpacity : 1}>
            <Marks 
              data={data} 
              xScale={xScale} 
              xValue={xValue}  
              yScale={yScale} 
              yValue={yValue} 
              colorScale={colorScale} 
              colorValue={colorValue}
              tooltipFormat={xAxisTickFormat} 
              circleRadius={circleRadius} 
            />
          </g>
          <Marks 
            data={filteredData} 
            xScale={xScale} 
            xValue={xValue}  
            yScale={yScale} 
            yValue={yValue} 
            colorScale={colorScale} 
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat} 
            circleRadius={circleRadius} 
          />
        </g>
      </svg>
    </g>
  )
};
window.App = App;
window.rootElement = document.getElementById('root');
document.title = 'Interactive Scatterplot Colour Legend';
ReactDOM.render(<App />, window.rootElement);