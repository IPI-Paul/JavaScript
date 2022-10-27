import React from 'react';
import ReactDOM from 'react-dom';
import { arc } from 'd3';

const width = 960;
const height = 305;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 10;
const eyeOffsetX = Math.floor(width / 13);
const eyeOffsetY = Math.floor(height / 7.5);
const eyeRadius = 23;
const mouthWidth = 10;
const mouthRadius = 100;

const mouthArc = arc()
  .innerRadius(mouthRadius)
  .outerRadius(mouthRadius + mouthWidth)
  .startAngle(Math.PI / 2)
  .endAngle(Math.PI * 3 / 2);

const App = () => (
  <svg width={width} height={height}>
  <g transform={`translate(${centerX}, ${centerY})`}>
    <circle 
      r={centerY - strokeWidth / 2} 
      fill="yellow"
      stroke="black"
      stroke-width={strokeWidth}
    >
    </circle>
    <circle 
      r={eyeRadius} 
      cx={-eyeOffsetX} 
      cy={-eyeOffsetY} 
    ></circle>
    <circle 
      r={eyeRadius} 
      cx={eyeOffsetX} 
      cy={-eyeOffsetY} 
    ></circle>
    <path d={mouthArc()} />
  </g>
</svg>
);
const rootElement = document.getElementById('root');
document.title = 'Smiley Face Part II';
ReactDOM.render(<App />, rootElement);