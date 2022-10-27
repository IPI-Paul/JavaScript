(function (React, ReactDoM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDoM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDoM);

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

  const App = () => {
    var div = document.createElement('div');
    div.innerHTML = `
    <svg width="${width}" height="${height}">
    <circle
      r="${centerY - strokeWidth / 2}"
      cx="${centerX}"
      cy="${centerY}"
      fill="yellow"
      stroke="black"
      stroke-width="${strokeWidth}"
    >
    </circle>
    <circle
      r="${eyeRadius}"
      cx="${centerX - eyeOffsetX}"
      cy="${centerY - eyeOffsetY}"
    ></circle>
    <circle
      r="${eyeRadius}"
      cx="${centerX + eyeOffsetX}"
      cy="${centerY - eyeOffsetY}"
    ></circle>
    <path d="${mouthArc()}" / >
  </svg>
`;
  div.innerHTML = `
<svg width="${width}" height="${height}">
  <g transform="translate(${centerX}, ${centerY})">
    <circle
      r="${centerY - strokeWidth / 2}"
      fill="yellow"
      stroke="black"
      stroke-width="${strokeWidth}"
    >
    </circle>
    <circle
      r="${eyeRadius}"
      cx="${-eyeOffsetX}"
      cy="${-eyeOffsetY}"
    ></circle>
    <circle
      r="${eyeRadius}"
      cx="${eyeOffsetX}"
      cy="${-eyeOffsetY}"
    ></circle>
    <path d="${mouthArc()}" / >
  </g>
</svg>
`;
    return div;
  };
  const rootElement = document.getElementById('root');
  document.title = 'Smiley Face Part IIIa';
  ReactDoM__default["default"].render(React__default["default"].createElement('test'), rootElement);
  rootElement.appendChild(App());

})(React, ReactDOM, d3);
