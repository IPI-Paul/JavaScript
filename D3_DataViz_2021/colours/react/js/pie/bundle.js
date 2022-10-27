(function (React, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const PieArc = ({pieRadius, pieWidth, startAngle, endAngle}) => {
    const pieArc = d3.arc()
    .innerRadius(pieRadius)
    .outerRadius(pieRadius + pieWidth)
    .startAngle(startAngle)
    .endAngle(endAngle);

    return pieArc();
  };

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/CSS Named Colours.csv';
  let data;
  let it = 0;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const centerX = width / 2;
  const centerY = height / 2;

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

    if(!data) {
      return React__default["default"].createElement('pre', null, ["Loading..."]);
    }

    return (
      React__default["default"].createElement('svg', {width: width, height: height}, [
        React__default["default"].createElement('g', {transform: `translate(${centerX}, ${centerY})`}, [

            d3.pie()
              .value(1)(data)
              .map(
                d => (
                React__default["default"].createElement('path', {
                  fill: d.data['RGB hex value'],
                  d: PieArc({
                      pieRadius: 0,
                      pieWidth: width,
                      startAngle: d.startAngle,
                      endAngle: d.endAngle
                    }
                  )}
                )
                )
              )

        ])
      ])
    )
  };
  const rootElement = document.getElementById('root');
  document.title = 'Rendering Data with React & D3';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3);
