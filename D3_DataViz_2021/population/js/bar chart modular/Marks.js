export const Marks = ({data, xScale, yScale, xValue, yValue, tooltipFormat}) => 
data.map(d => (
  <rect 
    key={d.Country}
    x={0} 
    y={yScale(yValue(d))}  
    width={xScale(xValue(d))} 
    height={yScale.bandwidth()} 
    className="mark"
  >
    <title>{tooltipFormat(xValue(d))}</title>
  </rect>
));

