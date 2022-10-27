import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'ipi';

const width = 960;
const height = 335;
const circleX = width / 2;
const circleY = height / 2;
const circleRadius = 30;
const initialMousePosition = {x: width / 2, y: height / 2};

const handleMouseMove = (event) => {
  const { clientX, clientY } = event;
  console.log({clientX, clientY})
};

const App = () => {
  const [mousePosition, setMousePosition] = useState({
    obj: 'mousePosition',
    state: initialMousePosition
  });
  return(
  <svg width={width} height={height} onMouseMove={handleMouseMove}>
    <circle 
      r={circleRadius} 
      cx={circleX} 
      cy={circleY} 
    />
  </svg>
  );
};
window.App = App;
window.rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);