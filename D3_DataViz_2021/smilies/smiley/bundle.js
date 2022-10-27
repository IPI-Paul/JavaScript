(function (React, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const width = 960;
  const height = 305;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = 10;
  const eyeOffsetX = Math.floor(width / 13);
  const eyeOffsetY = Math.floor(height / 7.5);
  const eyeRadius = 23;
  const mouthWidth = 10;
  const mouthRadius = 100;

  const mouthArc = d3.arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 3 / 2);

  const App = () => (
    React__default["default"].createElement('svg', {width: width, height: height}, [
    React__default["default"].createElement('g', {transform: `translate(${centerX}, ${centerY})`}, [
      React__default["default"].createElement('circle', {
        r: centerY - strokeWidth / 2,
        fill: "yellow",
        stroke: "black",
        'stroke-width': strokeWidth
      }
      ),
      React__default["default"].createElement('circle', {
        r: eyeRadius,
        cx: -eyeOffsetX,
        cy: -eyeOffsetY
      }),
      React__default["default"].createElement('circle', {
        r: eyeRadius,
        cx: eyeOffsetX,
        cy: -eyeOffsetY
      }),
      React__default["default"].createElement('path', {d: mouthArc()})
    ])
  ])
  );
  const rootElement = document.getElementById('root');
  document.title = 'Smiley Face Part II';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3);
