export const AxisLeft = ({yScale}) => 
  yScale.domain().map(tickValue => (
    <g className="tick">
      <text 
        key={tickValue}
        x={-3}
        dy="0.32em" 
        y={yScale(tickValue) + yScale.bandwidth() / 2}
        style={{textAnchor: 'end'}}
      >
        {tickValue}
      </text>
    </g>
  ));

