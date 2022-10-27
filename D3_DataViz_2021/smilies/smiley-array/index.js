import React from 'react';
import ReactDOM from 'react-dom';
import { range } from 'd3';
import { Face } from '../smiley-compartment/Face';

const width = 165;
const height = 150;

const array = range(7 * 2);

const App = () => array.map(() => (
  <Face 
    width={width} 
    height={height}
    centerX={width / 2}
    centerY={height / 2}
    strokeWidth={10}
    eyeOffsetX={Math.floor(width / 7.5)}
    eyeOffsetY={Math.floor(height / 7.5)}
    eyeRadius={10 + Math.random() * 5}
    mouthWidth={8 + Math.random() * 5}
    mouthRadius={40 + Math.random() * 5}
  />
));
const rootElement = document.getElementById('root');
document.title = 'Smiley Face Part VI';
ReactDOM.render(<App />, rootElement);