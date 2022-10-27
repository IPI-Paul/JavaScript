export const ColorLegend = ({
  colorScale, 
  tickSpacing, 
  tickSize,
  tickTextOffset
}) => colorScale.domain().map((domainValue, i) => (
      <g 
        transform={`translate(0, ${i * (tickSpacing ? tickSpacing : 20)})`}
        className="tick"
      >
        <circle fill={colorScale(domainValue)} r={tickSize ? tickSize : 10} />
        <text dy=".32em" x={tickTextOffset ? tickTextOffset : 20}>{domainValue}</text>
      </g>
));