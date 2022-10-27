import { csv } from 'd3';
import { useState } from 'ipi';

const csvUrl = 'http://localhost:8080/SourceFiles/csv/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';
let it = 0;

export const useMigrantData = () => {
  const [deaths, setData] = useState({obj: 'deaths', state: null})
  if(it == 0) {
    it = 1;
    const row = d => {
      d['Total Dead and Missing'] = +d['Total Dead and Missing'];
      d['Reported Date'] = new Date(d['Reported Date']);
      d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
      return d;
    };
    csv(csvUrl, row).then(deaths => setData({obj: 'deaths', state: deaths}));
  } else {
    it = 0;
  }

  return deaths; 
};


