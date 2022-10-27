(function (React, ReactDOM, ipi) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const width = 960;
  const height = 335;
  const circleX = width / 2;
  const circleY = height / 2;
  const circleRadius = 30;
  const initialMousePosition = {x: width / 2, y: height / 2};

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    console.log({clientX, clientY});
  };

  const App = () => {
    ipi.useState({
      obj: 'mousePosition',
      state: initialMousePosition
    });
    return(
    React__default["default"].createElement('svg', {width: width, height: height, onMouseMove: handleMouseMove}, [
      React__default["default"].createElement('circle', {
        r: circleRadius,
        cx: circleX,
        cy: circleY}
      )
    ])
    );
  };
  window.App = App;
  window.rootElement = document.getElementById('root');
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, ipi);
