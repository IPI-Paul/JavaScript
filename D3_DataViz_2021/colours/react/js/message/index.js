import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv } from 'd3';
import { message } from './message';

const csvUrl = 'http://localhost:8080/SourceFiles/csv/CSS Named Colours.csv';
let data;
let it = 0;

const getData = () => {
  if(it == 0) {
    it = 1;
    csv(csvUrl).then(setData);
  } else {
    it = 0;
  }
};

const setData = (dta) => {
  data = dta;
  ReactDOM.render(<App />, document.getElementById('root'));
}

const App = () => {
  getData();
  return <pre>{data ? message(data) : 'Loading...'}</pre>;
};
const rootElement = document.getElementById('root');
document.title = 'Loading Data with React';
ReactDOM.render(<App />, rootElement);