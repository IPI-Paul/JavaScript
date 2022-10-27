import { scaleTime, scaleLinear, timeFormat, extent, bin, timeMonths, sum, max, 
  format } from 'd3';
import { Marks } from './Marks';
import { AxisBottom } from '../../AxisBottom';
import { AxisLeft } from '../../AxisLeft';

const margin = { top: 0, right: 30, bottom: 20, left: 40 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 30;
const tickOffset = 10;
const barOffset = 3;

export const DateHistogram = ({migrants, width, height}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d['Reported Date'];
  const xAxisLabel = 'Reported Date';

  const yValue = d => d['Total Dead and Missing'];
  const yAxisLabel = 'Total Dead and Missing';

  const xAxisTickFormat = timeFormat('%b-%Y');
  const tooltipFormat = format(',')

  const xScale = scaleTime()
    .domain(extent(migrants, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))
    (migrants)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0]);

  return (
    <g>
      <rect width={width} height={height} className='bgWhite' />
      <g transform={`translate(${margin.left}, ${margin.top})`} className="multi">
        <AxisBottom 
          xScale={xScale} innerHeight={innerHeight} 
          tickFormat={xAxisTickFormat} 
          tickOffset={tickOffset} 
        />
        <AxisLeft 
          yScale={yScale} 
          innerWidth={innerWidth} 
          tickOffset={tickOffset}
        />
        <text 
          x={innerWidth / 2} 
          y={innerHeight + xAxisLabelOffset} 
          textAnchor="middle"
          className="axis-label-multi"
        >
          {xAxisLabel}
        </text>
        <text 
          textAnchor="middle"
          className="axis-label-multi" 
          transform={
            `translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`
          }
        >
          {yAxisLabel}
        </text>
        <Marks 
          binnedData={binnedData} 
          xScale={xScale} 
          yScale={yScale}
          tooltipFormat={tooltipFormat} 
          innerHeight={innerHeight} 
          barOffset={barOffset}
        />
        </g>
      </g>
  )
}