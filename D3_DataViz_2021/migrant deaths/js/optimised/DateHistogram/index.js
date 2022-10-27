import { 
  scaleTime, scaleLinear, timeFormat, extent, bin, timeMonths, sum, max, 
  format, brushX, select 
} from 'd3';
import { useRef } from 'ipi';
import { Marks } from './Marks';
import { AxisBottom } from '../../AxisBottom';
import { AxisLeft } from '../../AxisLeft';

const margin = { top: 0, right: 30, bottom: 20, left: 40 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 30;
const tickOffset = 10;
const barOffset = 3;
const xAxisTickFormat = timeFormat('%b-%Y');
const tooltipFormat = format(',');
let xScale;
let yScale;
let binnedData;

export const DateHistogram = ({migrants, width, height, setBrushExtent, xValue}) => {
  const brushRef = useRef();

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisLabel = 'Reported Date';

  const yValue = d => d['Total Dead and Missing'];
  const yAxisLabel = 'Total Dead and Missing';

  if (!xScale) {
    xScale = scaleTime()
      .domain(extent(migrants, xValue))
      .range([0, innerWidth])
      .nice();
  }

  const [start, stop] = xScale.domain();

  if(!binnedData){
    binnedData = bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))
      (migrants)
      .map(array => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1
      }));
  }

  if(!yScale){
    yScale = scaleLinear()
      .domain([0, max(binnedData, d => d.y)])
      .range([innerHeight, 0]);
  }

  const brush = brushX()
    .extent([[margin.left, 0], [innerWidth + margin.left, innerHeight]]);
  brush(select(brushRef.current));
  brush.on('brush end', (event, d) => {
    const selection = event.selection && [
      event.selection[0] - margin.left, 
      event.selection[1] - margin.left
    ];
    setBrushExtent({
      obj: 'brushExtent', 
      state: selection && selection.map(xScale.invert)
    });
  });

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
        <g ref={brushRef} id='brushRef' />
      </g>
  )
}