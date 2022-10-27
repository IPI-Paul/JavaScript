export const Marks = ({data, xScale, yScale, xValue, yValue, tooltipFormat, 
  circleRadius}) => 
data.map(d => (
  <circle 
    cx={xScale(xValue(d))} 
    cy={yScale(yValue(d))}  
    r={circleRadius}
    className="mark"
  >
    <title>{tooltipFormat(xValue(d))}</title>
  </circle>
));

