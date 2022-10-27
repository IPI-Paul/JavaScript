import React from 'react';
import ReactDOM from 'react-dom';
import { scaleSqrt, max } from 'd3';
import { useData as useWorldAtlas } from '../../../_data/land/useData';
import { useMigrantData } from '../../../_data/migrant deaths/useMigrantData';
import { Marks } from './Marks';

let worldAtlas;
let migrants;
const width = window.innerWidth - 10;
const height = window.innerHeight - 40;

const App = () => {  
  worldAtlas = worldAtlas ? worldAtlas : useWorldAtlas();
  migrants = migrants ? migrants : useMigrantData();

  if(!worldAtlas || !migrants) {
    return <pre>Loading...</pre>;
  }

  const sizeValue = d => d['Total Dead and Missing'];
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(migrants, sizeValue)])
    .range([0, maxRadius]);
  
  return (
    <svg width={width} height={height}>
      <Marks 
        worldAtlas={worldAtlas} 
        migrants={migrants} 
        sizeScale={sizeScale} 
        sizeValue={sizeValue} 
      />
    </svg>
  )
};
window.App = App;
window.rootElement = document.getElementById('root');
document.title = 'Migrant Deaths/Missing - Mapped';
ReactDOM.render(<App />, window.rootElement);