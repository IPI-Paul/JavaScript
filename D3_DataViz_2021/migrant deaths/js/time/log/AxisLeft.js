export const AxisLeft = ({yScale, innerWidth, tickOffset}) => 
  yScale.ticks().map(tickValue => (
    <g className="tick" transform={`translate(0, ${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text 
        key={tickValue}
        x={-(tickOffset ? tickOffset : 3)}
        dy="0.32em" 
        style={{textAnchor: 'end'}}
      >
        {yScale.tickFormat()(tickValue)}
      </text>
    </g>
  ));

