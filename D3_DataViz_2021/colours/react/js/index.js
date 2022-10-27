import { arc } from 'd3';

export const PieArc = ({pieRadius, pieWidth, startAngle, endAngle}) => {
  const pieArc = arc()
  .innerRadius(pieRadius)
  .outerRadius(pieRadius + pieWidth)
  .startAngle(startAngle)
  .endAngle(endAngle);

  return pieArc();
};