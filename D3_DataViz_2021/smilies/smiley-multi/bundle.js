(function (React, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const BackgroundCircle = ({radius, strokeWidth}) => (
    React.createElement('circle', {
        r: radius,
        fill: "yellow",
        stroke: "black",
        'stroke-width': strokeWidth}
      )
  );

  const Eyes = ({eyeRadius, eyeOffsetX, eyeOffsetY}) => (
    React.createElement('g', null, [
      React.createElement('circle', {
        r: eyeRadius,
        cx: -eyeOffsetX,
        cy: -eyeOffsetY}
      ),
      React.createElement('circle', {
        r: eyeRadius,
        cx: eyeOffsetX,
        cy: -eyeOffsetY}
      )
    ])
  );

  const Mouth = ({mouthRadius, mouthWidth}) => {
    const mouthArc = d3.arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 3 / 2);

    return React.createElement('path', {d: mouthArc()});
  };

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

  const App = () => (
    React__default["default"].createElement('svg', {width: width, height: height}, [
    React__default["default"].createElement('g', {transform: `translate(${centerX}, ${centerY})`}, [
      BackgroundCircle({
        radius: centerY - strokeWidth / 2,
        strokeWidth: strokeWidth}
      ),
      Eyes({
        eyeRadius: eyeRadius,
        eyeOffsetX: eyeOffsetX,
        eyeOffsetY: eyeOffsetY}
      ),
      Mouth({
        mouthRadius: mouthRadius,
        mouthWidth: mouthWidth}
      )
    ])
  ])
  );
  const rootElement = document.getElementById('root');
  document.title = 'Smiley Face Part IV';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3);
