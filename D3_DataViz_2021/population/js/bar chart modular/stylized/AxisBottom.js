export const AxisBottom = ({xScale, innerHeight, tickFormat}) => 
  xScale.ticks().map(tickValue => (
    <g 
      key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}
      className="tick"
    >
      <line y2={innerHeight} />
      <text 
        dy="0.71em"
        y={innerHeight + 3} 
        style={{textAnchor: 'middle'}}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));