import { json } from 'd3';
import { feature, mesh } from 'topojson';
import { useState } from 'ipi';

const jsonUrl = 'http://localhost:8080/SourceFiles/json/countries-50m.json';
let it = 0;

export const useData = () => {
  const [landData, setData] = useState({obj: 'landData', state: null});

  if(it == 0) {
    it = 1;
    json(jsonUrl).then(topology => {
      const { countries, land } = topology.objects;
      setData({obj: 'landData', state: {
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b)
      }})
    });
  } else {
    it = 0;
  }
  
  return landData; 
};