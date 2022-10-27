(function (React$1, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/week_temperature_sf.csv';
  let it = 0;

  const useData = () => {
    const getData = () => {
      if(it == 0) {
        it = 1;
        const row = d => {
          d.temperature = +d.temperature;
          d.timestamp = new Date(d.timestamp);
          return d;
        };
        return d3.csv(csvUrl, row).then(setData);
      } else {
        it = 0;
      }
    };

    const setData = async (dta) => {
      return await dta;
    };

    return getData();
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

  const Marks = ({data, xScale, yScale, xValue, yValue, tooltipFormat,
    circleRadius}) =>
  data.map(d => (
    React.createElement('circle', {
      cx: xScale(xValue(d)),
      cy: yScale(yValue(d)),
      r: circleRadius,
      className: "mark"
    }, [
      React.createElement('title', null, [tooltipFormat(xValue(d))])
    ])
  ));

  let data;
  const width = window.innerWidth - 10;
  const height = window.innerHeight - 40;
  const margin = { top: 20, right: 30, bottom: 65, left: 90 };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 40;

  const App = () => {
    if(!data) {
      useData()
        .then(response => {
          data = response;
          ReactDOM__default["default"].render(App(), rootElement);
        });
      return React__default["default"].createElement('pre', null, ["Loading..."]);
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const xValue = d => d.timestamp;
    const xAxisLabel = 'Time';

    const yValue = d => d.temperature;
    const yAxisLabel = 'Temperature';

    const xAxisTickFormat = d3.timeFormat('%a');

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0]);

    return (
      React__default["default"].createElement('svg', {width: width, height: height}, [
        React__default["default"].createElement('g', {transform: `translate(${margin.left}, ${margin.top})`}, [
          AxisBottom({
            xScale: xScale, innerHeight: innerHeight,
            tickFormat: xAxisTickFormat,
            tickOffset: 5}
          ),
          AxisLeft({
            yScale: yScale,
            innerWidth: innerWidth,
            tickOffset: 5}
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
            data: data,
            xScale: xScale,
            yScale: yScale,
            xValue: xValue,
            yValue: yValue,
            tooltipFormat: xAxisTickFormat,
            circleRadius: 7}
          )
        ])
      ])
    )
  };
  const rootElement = document.getElementById('root');
  document.title = 'Temperature Stylized Line Chart - Working with Time';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3);
