import React from 'react';
import ReactDOM from 'react-dom';
import { scaleSqrt, max } from 'd3';
import { useData as useWorldAtlas } from '../../../_data/land/useData';
import { useCities } from '../../../_data/cities/useCities';
import { Marks } from './Marks';

let worldAtlas;
let cities;
const width = window.innerWidth - 10;
const height = window.innerHeight - 40;

const App = () => {  
  worldAtlas = worldAtlas ? worldAtlas : useWorldAtlas();
  cities = cities ? cities : useCities();

  if(!worldAtlas || !cities) {
    return <pre>Loading...</pre>;
  }

  const sizeValue = d => d.population;
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, maxRadius]);
  
  return (
    <svg width={width} height={height}>
        <Marks 
        worldAtlas={worldAtlas} 
        cities={cities} 
        sizeScale={sizeScale} 
        sizeValue={sizeValue} 
      />
    </svg>
  )
};
window.App = App;
window.rootElement = document.getElementById('root');
document.title = 'Sized Points on a Map';
ReactDOM.render(<App />, window.rootElement);