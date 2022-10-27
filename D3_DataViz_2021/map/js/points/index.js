import React from 'react';
import ReactDOM from 'react-dom';
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
  
  return (
    <svg width={width} height={height}>
        <Marks worldAtlas={worldAtlas} cities={cities} />
    </svg>
  )
};
window.App = App;
window.rootElement = document.getElementById('root');
document.title = 'Points on a Map';
ReactDOM.render(<App />, window.rootElement);