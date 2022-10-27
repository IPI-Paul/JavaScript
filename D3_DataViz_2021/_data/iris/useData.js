import { csv } from 'd3';

const csvUrl = 'http://localhost:8080/SourceFiles/csv/iris.csv';
let it = 0;

export const useData = () => {
  const getData = () => {
    if(it == 0) {
      it = 1;
      const row = d => {
        d.sepal_length = +d.sepal_length;
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
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


