export const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset}) => 
  xScale.ticks().map(tickValue => (
    <g 
      key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}
      className="tick"
    >
      <line y2={innerHeight} />
      <text 
        dy="0.71em"
        y={innerHeight + (tickOffset ? tickOffset : 3)} 
        style={{textAnchor: 'middle'}}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));