(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  // Does not work at all!

  const width = 1140;
  const height = 318;
  const circleRadius = 30;
  const initialMousePosition = {x: width / 2, y: height / 2};

  const App = () => {
    const [mousePosition, setMousePosition] = React.useState(initialMousePosition);
    const handleMouseMove = React.useCallback(event => {
      init = true;
      const { clientX, clientY } = event;
      setMousePosition({clientX, clientY});
    }, [setMousePosition]);
    return(
    React__default["default"].createElement('svg', {width: width, height: height, onMouseMove: !init ? handleMouseMove : null}, [
      React__default["default"].createElement('circle', {
        cx: mousePosition.x,
        cy: mousePosition.y,
        r: circleRadius}
      )
    ])
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM);
