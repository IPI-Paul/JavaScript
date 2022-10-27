(function (React, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/UN_Population_2019.csv';
  let data;
  let it = 0;
  const width = window.innerWidth - 10;
  const height = window.innerHeight - 40;

  const getData = () => {
    if(it == 0) {
      it = 1;
      const row = d => {
        d.Population = +d['2020'];
        return d;
      };
      d3.csv(csvUrl, row).then(data => {
        setData(data.slice(0, 10));
      });
    } else {
      it = 0;
    }
  };

  const setData = (dta) => {
    data = dta;
    ReactDOM__default["default"].render(App(), document.getElementById('root'));
  };

  const App = () => {
    getData();

    if(!data) {
      return React__default["default"].createElement('pre', null, ["Loading..."]);
    }

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.Country))
      .range([0, height]);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Population)])
      .range([0, width]);

    return (
      React__default["default"].createElement('svg', {width: width, height: height}, [
        data.map(d =>
        React__default["default"].createElement('rect', {
          x: 0,
          y: yScale(d.Country),
          width: xScale(d.Population),
          height: yScale.bandwidth()}
        ))
      ])
    )
  };
  const rootElement = document.getElementById('root');
  document.title = 'Rendering Data with React & D3';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3);
