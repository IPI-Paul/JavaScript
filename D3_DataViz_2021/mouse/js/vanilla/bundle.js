(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const width = 1140;
  const height = 318;
  const circleRadius = 30;
  const initialMousePosition = {x: width / 2, y: height / 2};
  let mousePosition = initialMousePosition;

  const App = () => {
    // const [mousePosition, setMousePosition] = useState(initialMousePosition);
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      // setMousePosition({clientX, clientY})
      mousePosition = {x: clientX, y: clientY};
      ReactDOM__default["default"].render(App(), rootElement);
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
  const rootElement = document.getElementById('root');
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM);
