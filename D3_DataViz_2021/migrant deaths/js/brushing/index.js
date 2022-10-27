import React from 'react';
import ReactDOM from 'react-dom';
import { useData as useWorldAtlas } from '../../../_data/land/useData';
import { useMigrantData } from '../../../_data/migrant deaths/useMigrantData';
import { BubbleMap } from './BubbleMap/index';
import { DateHistogram } from './DateHistogram/index';
import { useState } from 'ipi';

let worldAtlas;
let migrants;
const width = window.innerWidth - 10;
const height = window.innerHeight - 30;
const dateHistogramSize = 0.2;
const xValue = d => d['Reported Date'];
  
const App = () => {  
  worldAtlas = worldAtlas ? worldAtlas : useWorldAtlas();
  migrants = migrants ? migrants : useMigrantData();
  
  if(!worldAtlas || !migrants) {
    return <pre>Loading...</pre>;
  }
  
  const [brushExtent, setBrushExtent] = useState({obj: 'brushExtent', state: null});
  
  const filteredData = brushExtent ? migrants.filter(d => {
    const date = xValue(d);
    return date > brushExtent[0] && date < brushExtent[1];
  }) : migrants;

  return (
    <svg width={width} height={height}>
      <BubbleMap
        migrants={migrants} 
        filteredData={filteredData} 
        worldAtlas={worldAtlas} 
      />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram 
        migrants={migrants} 
        width={width}
        height={dateHistogramSize * height} 
        setBrushExtent={setBrushExtent} 
        xValue={xValue} 
        />
      </g>
    </svg>
  )
};

window.App = App;
window.rootElement = document.getElementById('root');
document.title = 'Migrant Deaths/Missing - Multiple Views with Brushing';
ReactDOM.render(<App />, window.rootElement);