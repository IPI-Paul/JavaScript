import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'ipi';

const width = 1140;
const height = 318;
const circleRadius = 30;
const initialMousePosition = {x: width / 2, y: height / 2};

const App = () => {
  const [mousePosition, setMousePosition] = useState({
    obj: 'mousePosition',
    state: initialMousePosition
  });
  
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setMousePosition({
      obj: 'mousePosition',
      state: {x: clientX, y: clientY}
    });
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

window.App = App;
window.rootElement = document.getElementById('root');
ReactDOM.render(<App />, window.rootElement);