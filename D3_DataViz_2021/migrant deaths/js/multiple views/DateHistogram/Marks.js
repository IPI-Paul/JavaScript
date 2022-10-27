export const Marks = ({
  binnedData, xScale, yScale, tooltipFormat, innerHeight, barOffset
}) => 
  binnedData.map(d => (
  <rect 
    x={xScale(d.x0)} 
    y={yScale(d.y)}  
    width={xScale(d.x1) - xScale(d.x0) - barOffset} 
    height={innerHeight - yScale(d.y)}
    className="mark"
  >
    <title>{tooltipFormat(d.y)}</title>
  </rect>
));

