import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie } from 'd3';
import { PieArc } from '../pie';

const csvUrl = 'http://localhost:8080/SourceFiles/csv/CSS Named Colours.csv';
let data;
let it = 0;
const width = window.innerWidth;
const height = window.innerHeight;
const centerX = width / 2;
const centerY = height / 2;

const getData = () => {
  if(it == 0) {
    it = 1;
    csv(csvUrl).then(setData);
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

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {
          pie()
            .value(1)(data)
            .map(
              d => (
              <path 
                fill={d.data['RGB hex value']} 
                d={PieArc({
                    pieRadius: 0,
                    pieWidth: width,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                  }
                )}
              />
              )
            )
        }
      </g>
    </svg>
  )
};
const rootElement = document.getElementById('root');
document.title = 'Rendering Data with React & D3';
ReactDOM.render(<App />, rootElement);