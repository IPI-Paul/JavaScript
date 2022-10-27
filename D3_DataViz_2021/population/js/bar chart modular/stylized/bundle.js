(function (React$1, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/UN_Population_2019.csv';
  let it = 0;

  const useData = () => {
    const getData = () => {
      if(it == 0) {
        it = 1;
        const row = d => {
          d.Population = +d['2020'] * 1000;
          return d;
        };
        return d3.csv(csvUrl, row).then(data => (
          setData(data.slice(0, 10))
        ));
      } else {
        it = 0;
      }
    };

    const setData = async (dta) => {
      return await dta;
    };

    return getData();
  };

  const AxisBottom = ({xScale, innerHeight, tickFormat}) =>
    xScale.ticks().map(tickValue => (
      React.createElement('g', {
        key: tickValue, transform: `translate(${xScale(tickValue)}, 0)`,
        className: "tick"
      }, [
        React.createElement('line', {y2: innerHeight}),
        React.createElement('text', {
          dy: "0.71em",
          y: innerHeight + 3,
          style: {textAnchor: 'middle'}
        }, [
          tickFormat(tickValue)
        ])
      ])
    ));

  const AxisLeft = ({yScale}) =>
    yScale.domain().map(tickValue => (
      React.createElement('g', {className: "tick"}, [
        React.createElement('text', {
          key: tickValue,
          x: -3,
          dy: "0.32em",
          y: yScale(tickValue) + yScale.bandwidth() / 2,
          style: {textAnchor: 'end'}
        }, [
          tickValue
        ])
      ])
    ));

  const Marks = ({data, xScale, yScale, xValue, yValue, tooltipFormat}) =>
  data.map(d => (
    React.createElement('rect', {
      key: d.Country,
      x: 0,
      y: yScale(yValue(d)),
      width: xScale(xValue(d)),
      height: yScale.bandwidth(),
      className: "mark"
    }, [
      React.createElement('title', null, [tooltipFormat(xValue(d))])
    ])
  ));

  let data;
  const width = window.innerWidth - 10;
  const height = window.innerHeight - 40;
  const margin = { top: 20, right: 30, bottom: 65, left: 220 };
  const xAxisLabelOffset = 50;

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
    const yValue = d => d.Country;
    const xValue = d => d.Population;

    const siFormat = d3.format('.2s');
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

    const yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .paddingInner(0.15);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    return (
      React__default["default"].createElement('svg', {width: width, height: height}, [
        React__default["default"].createElement('g', {transform: `translate(${margin.left}, ${margin.top})`}, [
          AxisBottom({
            xScale: xScale, innerHeight: innerHeight,
            tickFormat: xAxisTickFormat}
          ),
          AxisLeft({yScale: yScale}),
          React__default["default"].createElement('text', {
            x: innerWidth / 2,
            y: innerHeight + xAxisLabelOffset,
            textAnchor: "middle",
            className: "axis-label"
          }, ["Population"]),
          Marks({
            data: data,
            xScale: xScale,
            yScale: yScale,
            xValue: xValue,
            yValue: yValue,
            tooltipFormat: xAxisTickFormat}
          )
        ])
      ])
    )
  };
  const rootElement = document.getElementById('root');
  document.title = 'Stylized Bar Chart';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3);
