(function (React, ReactDOM, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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

  const FaceContainer = ({ children, width, height, centerX, centerY }) => (
    React.createElement('svg', {width: width, height: height}, [
      React.createElement('g', {transform: `translate(${centerX}, ${centerY})`}, [
        children
      ])
    ])
  );

  const Face = ({width, height, centerX, centerY, strokeWidth, eyeRadius,
    eyeOffsetX, eyeOffsetY, mouthRadius, mouthWidth}) => (
    FaceContainer({
      width: width,
      height: height,
      centerX: centerX,
      centerY: centerY
    , children: [
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
    ]})
  );

  const width = 960;
  const height = 305;

  const App = () => (
    Face({
      width: width,
      height: height,
      centerX: width / 2,
      centerY: height / 2,
      strokeWidth: 10,
      eyeOffsetX: Math.floor(width / 13),
      eyeOffsetY: Math.floor(height / 7.5),
      eyeRadius: 23,
      mouthWidth: 10,
      mouthRadius: 100}
    )
  );
  const rootElement = document.getElementById('root');
  document.title = 'Smiley Face Part V';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3);
