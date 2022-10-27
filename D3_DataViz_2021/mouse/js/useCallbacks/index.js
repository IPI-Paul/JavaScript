// Does not work at all!
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const width = 1140;
const height = 318;
const circleRadius = 30;
const initialMousePosition = {x: width / 2, y: height / 2};

const App = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const handleMouseMove = useCallback(event => {
    init = true;
    const { clientX, clientY } = event;
    setMousePosition({clientX, clientY});
  }, [setMousePosition]);
  return(
  <svg width={width} height={height} onMouseMove={!init ? handleMouseMove : null}>
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