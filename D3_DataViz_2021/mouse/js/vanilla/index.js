import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const width = 1140;
const height = 318;
const circleRadius = 30;
const initialMousePosition = {x: width / 2, y: height / 2};
let mousePosition = initialMousePosition;

const App = () => {
  // const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    // setMousePosition({clientX, clientY})
    mousePosition = {x: clientX, y: clientY};
    ReactDOM.render(<App />, rootElement);
  };
  return(
  <svg width={width} height={height} onMouseMove={handleMouseMove}>
    <circle 
      cx={mousePosition.x} 
      cy={mousePosition.y} 
      r={circleRadius} 
    />
  </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);