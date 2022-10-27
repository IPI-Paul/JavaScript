export const ColorLegend = ({
  colorScale, 
  tickSpacing, 
  tickSize,
  tickTextOffset,
  onHover,
  hoveredValue, 
  fadeOpacity
}) => 
  colorScale.domain().map((domainValue, i) => (
      <g 
        transform={`translate(0, ${i * (tickSpacing ? tickSpacing : 20)})`}
        className="tick" 
        onMouseEnter={() => {onHover(domainValue);}} 
        onMouseOut={() => {onHover(null);}} 
        opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
      >
        <circle fill={colorScale(domainValue)} r={tickSize ? tickSize : 10} />
        <text dy=".32em" x={tickTextOffset ? tickTextOffset : 20}>{domainValue}</text>
      </g>
  ));