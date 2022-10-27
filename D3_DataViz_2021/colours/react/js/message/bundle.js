(function (React, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const message = data => {
    let message = '';
    message += Math.round(d3.csvFormat(data).length / 1024) + ' kB\n';
    message += data.length + ' rows\n';
    message += data.columns.length + ' columns\n';
    return message;
  };

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/CSS Named Colours.csv';
  let data;
  let it = 0;

  const getData = () => {
    if(it == 0) {
      it = 1;
      d3.csv(csvUrl).then(setData);
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
    return React__default["default"].createElement('pre', null, [data ? message(data) : 'Loading...']);
  };
  const rootElement = document.getElementById('root');
  document.title = 'Loading Data with React & D3';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3);
