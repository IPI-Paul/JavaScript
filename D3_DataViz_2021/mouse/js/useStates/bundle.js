(function (React, ReactDOM, ipi) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const width = 1140;
  const height = 318;
  const circleRadius = 30;
  const initialMousePosition = {x: width / 2, y: height / 2};

  const App = () => {
    const [mousePosition, setMousePosition] = ipi.useState({
      obj: 'mousePosition',
      state: initialMousePosition
    });

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({
        obj: 'mousePosition',
        state: {x: clientX, y: clientY}
      });
    };
    return(
    React__default["default"].createElement('svg', {width: width, height: height, onMouseMove: handleMouseMove}, [
      React__default["default"].createElement('circle', {
        cx: mousePosition.x,
        cy: mousePosition.y,
        r: circleRadius}
      )
    ])
    );
  };

  window.App = App;
  window.rootElement = document.getElementById('root');
  ReactDOM__default["default"].render(App(), window.rootElement);

})(React, ReactDOM, ipi);
