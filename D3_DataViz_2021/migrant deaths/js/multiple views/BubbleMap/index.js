import { scaleSqrt, max } from 'd3';
import { Marks } from './Marks';

export const BubbleMap = ({migrants, worldAtlas}) => {
  const sizeValue = d => d['Total Dead and Missing'];
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(migrants, sizeValue)])
    .range([0, maxRadius]);
  
  return (
    <Marks 
      worldAtlas={worldAtlas} 
      migrants={migrants} 
      sizeScale={sizeScale} 
      sizeValue={sizeValue} 
    />
  );
};