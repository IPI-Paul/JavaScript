import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks';

let sizeScale;

export const BubbleMap = ({migrants, filteredData, worldAtlas}) => {
  const sizeValue = d => d['Total Dead and Missing'];
  const maxRadius = 15;

  if(!sizeScale) {
    sizeScale = scaleSqrt()
      .domain([0, max(migrants, sizeValue)])
      .range([0, maxRadius]);
  }
  
  return (
    <Marks 
      worldAtlas={worldAtlas} 
      migrants={filteredData} 
      sizeScale={sizeScale} 
      sizeValue={sizeValue} 
    />
  );
};