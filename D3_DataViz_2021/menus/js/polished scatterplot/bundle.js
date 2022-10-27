(function (React$1, ReactDOM, d3, ipi) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/iris.csv';
  let it = 0;

  const useData = () => {
    const getData = () => {
      if(it == 0) {
        it = 1;
        const row = d => {
          d.sepal_length = +d.sepal_length;
          d.sepal_width = +d.sepal_width;
          d.petal_length = +d.petal_length;
          d.petal_width = +d.petal_width;
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

  const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
    React__default["default"].createElement('select', {id: id, onChange: event => onSelectedValueChange(event.target.value)}, [
      options.map(({value, label}) => (
        React__default["default"].createElement('option', {value: value, selected: value === selectedValue}, [label])
      ))
    ])
  );

  let data;
  const width = window.innerWidth - 10;
  const height = window.innerHeight - 70;
  const margin = { top: 20, right: 30, bottom: 65, left: 90 };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 40;
  const xId = "x-select";
  const yId = "y-select";
  const attributes = [
    {value: 'sepal_length', label: 'Sepal Length'},
    {value: 'sepal_width', label: 'Sepal Width'},
    {value: 'petal_length', label: 'Petal Length'},
    {value: 'petal_width', label: 'Petal Width'},
    {value: 'species', label: 'Species'}
  ];

  const getLabel = value => {
    for(let i = 0; i < attributes.length; i++) {
      if(attributes[i].value === value) {
        return attributes[i].label;
      }
    }
  };

  const App = () => {
    if(!data) {
      useData()
        .then(response => {
          data = response;
          ReactDOM__default["default"].render(App(), window.rootElement);
        });
      return React__default["default"].createElement('pre', null, ["Loading..."]);
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    let initialXAttribute = 'petal_length';
    const [xAttribute, setXAttribute] = ipi.useState({obj: 'xAttribute', state: initialXAttribute});
    const xValue = d => d[xAttribute];
    const xAxisLabel = getLabel(xAttribute);

    let initialYAttribute = 'sepal_width';
    const [yAttribute, setYAttribute] = ipi.useState({obj: 'yAttribute', state: initialYAttribute});
    const yValue = d => d[yAttribute];
    const yAxisLabel = getLabel(yAttribute);

    const siFormat = d3.format('.2s');
    const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([0, innerHeight]);

    return (
      React__default["default"].createElement('g', null, [
        React__default["default"].createElement('div', {className: "menus-container"}, [
          React__default["default"].createElement('label', {for: xId, className: "dropdown-label"}, ["X"]),
          Dropdown({
            options: attributes,
            id: xId,
            selectedValue: xAttribute,
            onSelectedValueChange: (value) => setXAttribute({obj: 'xAttribute', state: value}),
            className: ""}
          ),
          React__default["default"].createElement('label', {for: yId, className: "dropdown-label"}, ["Y"]),
          Dropdown({
            options: attributes,
            id: yId,
            selectedValue: yAttribute,
            onSelectedValueChange: (value) => setYAttribute({obj: 'yAttribute', state: value})}
          )
        ]),
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
      ])
    )
  };
  window.App = App;
  window.rootElement = document.getElementById('root');
  document.title = 'Polished Scatterplot with Menus';
  ReactDOM__default["default"].render(App(), window.rootElement);

})(React, ReactDOM, d3, ipi);
