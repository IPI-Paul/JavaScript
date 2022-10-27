import React from 'react';
import ReactDOM from 'react-dom';
import { BackgroundCircle } from './BackgroundCircle';
import { Eyes } from './Eyes';
import { Mouth } from './Mouth';

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

const App = () => (
  <svg width={width} height={height}>
  <g transform={`translate(${centerX}, ${centerY})`}>
    <BackgroundCircle 
      radius={centerY - strokeWidth / 2} 
      strokeWidth={strokeWidth}
    />
    <Eyes 
      eyeRadius={eyeRadius} 
      eyeOffsetX={eyeOffsetX} 
      eyeOffsetY={eyeOffsetY}
    />
    <Mouth 
      mouthRadius={mouthRadius} 
      mouthWidth={mouthWidth}
    />
  </g>
</svg>
);
const rootElement = document.getElementById('root');
document.title = 'Smiley Face Part IV';
ReactDOM.render(<App />, rootElement);