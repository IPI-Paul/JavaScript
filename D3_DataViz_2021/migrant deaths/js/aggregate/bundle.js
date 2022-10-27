(function (React$1, ReactDOM, d3, ipi) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';
  let it = 0;

  const useMigrantData = () => {
    const [deaths, setData] = ipi.useState({obj: 'deaths', state: null});
    if(it == 0) {
      it = 1;
      const row = d => {
        d['Total Dead and Missing'] = +d['Total Dead and Missing'];
        d['Reported Date'] = new Date(d['Reported Date']);
        d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
        return d;
      };
      d3.csv(csvUrl, row).then(deaths => setData({obj: 'deaths', state: deaths}));
    } else {
      it = 0;
    }

    return deaths;
  };

  const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset}) =>
    xScale.ticks().map(tickValue => (
      React.createElement('g', {
        key: tickValue, transform: `translate(${xScale(tickValue)}, 0)`,
        className: "tick"
      }, [
        React.createElement('line', {y2: innerHeight}),
        React.createElement('text', {
          dy: "0.71em",
          y: innerHeight + (tickOffset ? tickOffset : 3),
          style: {textAnchor: 'middle'}
        }, [
          tickFormat(tickValue)
        ])
      ])
    ));

  const AxisLeft = ({yScale, innerWidth, tickOffset}) =>
    yScale.ticks().map(tickValue => (
      React.createElement('g', {className: "tick", transform: `translate(0, ${yScale(tickValue)})`}, [
        React.createElement('line', {x2: innerWidth}),
        React.createElement('text', {
          key: tickValue,
          x: -(tickOffset ? tickOffset : 3),
          dy: "0.32em",
          style: {textAnchor: 'end'}
        }, [
          tickValue
        ])
      ])
    ));

  const Marks = ({
    binnedData, xScale, yScale, tooltipFormat, innerHeight, barOffset
  }) =>
    binnedData.map(d => (
    React.createElement('rect', {
      x: xScale(d.x0),
      y: yScale(d.y),
      width: xScale(d.x1) - xScale(d.x0) - barOffset,
      height: innerHeight - yScale(d.y),
      className: "mark"
    }, [
      React.createElement('title', null, [tooltipFormat(d.y)])
    ])
  ));

  let data;
  const width = window.innerWidth - 10;
  const height = window.innerHeight - 40;
  const margin = { top: 20, right: 30, bottom: 65, left: 90 };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 55;
  const tickOffset = 10;
  const barOffset = 3;

  const App = () => {
    data = data ? data : useMigrantData();

    if(!data) {
      return React__default["default"].createElement('pre', null, ["Loading..."]);
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d['Reported Date'];
    const xAxisLabel = 'Reported Date';

    const yValue = d => d['Total Dead and Missing'];
    const yAxisLabel = 'Total Dead and Missing';

    const xAxisTickFormat = d3.timeFormat('%b-%Y');
    const tooltipFormat = d3.format(',');

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const [start, stop] = xScale.domain();

    const binnedData = d3.bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(d3.timeMonths(start, stop))
      (data)
      .map(array => ({
        y: d3.sum(array, yValue),
        x0: array.x0,
        x1: array.x1
      }));

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(binnedData, d => d.y)])
      .range([innerHeight, 0]);

    return (
      React__default["default"].createElement('svg', {width: width, height: height}, [
        React__default["default"].createElement('g', {transform: `translate(${margin.left}, ${margin.top})`}, [
          AxisBottom({
            xScale: xScale, innerHeight: innerHeight,
            tickFormat: xAxisTickFormat,
            tickOffset: tickOffset}
          ),
          AxisLeft({
            yScale: yScale,
            innerWidth: innerWidth,
            tickOffset: tickOffset}
          ),
          React__default["default"].createElement('text', {
            x: innerWidth / 2,
            y: innerHeight + xAxisLabelOffset,
            textAnchor: "middle",
            className: "axis-label"
          }, [
            xAxisLabel
          ]),
          React__default["default"].createElement('text', {
            textAnchor: "middle",
            className: "axis-label",
            transform:
              `translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`

          }, [
            yAxisLabel
          ]),
          Marks({
            binnedData: binnedData,
            xScale: xScale,
            yScale: yScale,
            tooltipFormat: tooltipFormat,
            innerHeight: innerHeight,
            barOffset: barOffset}
          )
        ])
      ])
    )
  };

  window.App = App;
  window.rootElement = document.getElementById('root');
  document.title = 'Migrant Deaths/Missing - Aggregated';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3, ipi);
