import { csv } from 'd3';

const csvUrl = 'http://localhost:8080/SourceFiles/csv/cars.csv';

export const getData = async () => {
  const data = await csv(csvUrl);

  // Have a look at the attributes available in the console!
  console.log(data[0]);

  return data;
};