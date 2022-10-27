import React from 'react';
import ReactDOM from 'react-dom';
import { Face } from './Face';

const width = 960;
const height = 305;

const App = () => (
  <Face 
    width={width} 
    height={height}
    centerX={width / 2}
    centerY={height / 2}
    strokeWidth={10}
    eyeOffsetX={Math.floor(width / 13)}
    eyeOffsetY={Math.floor(height / 7.5)}
    eyeRadius={23}
    mouthWidth={10}
    mouthRadius={100}
  />
);
const rootElement = document.getElementById('root');
document.title = 'Smiley Face Part V';
ReactDOM.render(<App />, rootElement);