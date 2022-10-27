import React from 'react';
import ReactDOM from 'react-dom';
// import {  } from 'd3';
import { useData } from '../../../_data/country/useData';
import { Marks } from './Marks';

let data;
const width = window.innerWidth - 10;
const height = window.innerHeight - 40;

const App = () => {  
  data = useData();

  if(!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
        <Marks data={data} />
    </svg>
  )
};

window.App = App;
window.rootElement = document.getElementById('root');
document.title = 'World Map - Country';
ReactDOM.render(<App />, window.rootElement);