import { csv } from 'd3';
import { useState } from 'ipi';

const csvUrl = 'http://localhost:8080/SourceFiles/csv/worldcities_clean.csv';
let it = 0;

const row = d => {
  d.lat = +d.lat;
  d.lng = +d.lng;
  d.population = +d.population;
  return d;
}

export const useCities = () => {
  const [cityData, setData] = useState({obj: 'cityData', state: null});

  if(it == 0) {
    it = 1;
    csv(csvUrl, row).then(cityData => setData({obj: 'cityData', state: cityData}));
  } else {
    it = 0;
  }
  
  return cityData; 
};
