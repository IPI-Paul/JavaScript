import { csv } from 'd3';

const csvUrl = 'http://localhost:8080/SourceFiles/csv/week_temperature_sf.csv';
let it = 0;

export const useData = () => {
  const getData = () => {
    if(it == 0) {
      it = 1;
      const row = d => {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
        return d;
      };
      return csv(csvUrl, row).then(setData);
    } else {
      it = 0;
    }
  };

  const setData = async (dta) => {
    return await dta;
  };

  return getData(); 
};


