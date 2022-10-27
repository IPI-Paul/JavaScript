(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const App = () => (
    React__default["default"].createElement('div', null, [
      React__default["default"].createElement('label', {for: "pet-select"}, ["Choose a pet: "]),

      React__default["default"].createElement('select', {id: "pet-select"}, [
        React__default["default"].createElement('option', {value: ""}, ["--Please choose an option--"]),
        React__default["default"].createElement('option', {value: "dog"}, ["Dog"]),
        React__default["default"].createElement('option', {value: "cat"}, ["Cat"]),
        React__default["default"].createElement('option', {value: "hamster"}, ["Hamster"]),
        React__default["default"].createElement('option', {value: "parrot"}, ["Parrot"]),
        React__default["default"].createElement('option', {value: "spider"}, ["Spider"]),
        React__default["default"].createElement('option', {value: "goldfish"}, ["Goldfish"])
      ])
    ])
  );
  const rootElement = document.getElementById('root');
  document.title = 'Menus with React';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM);
