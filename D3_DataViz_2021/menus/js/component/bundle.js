(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const Dropdown = ({options, id}) => (
    React__default["default"].createElement('select', {id: id}, [
      React__default["default"].createElement('option', {value: ""}, ["--Please choose an option--"]),
      options.map(({value, label}) => (
        React__default["default"].createElement('option', {value: value}, [label])
      ))
    ])
  );

  const options = [
    {value: 'dog', label: 'Dog'},
    {value: 'cat', label: 'Cat'},
    {value: 'hamster', label: 'Hamster'},
    {value: 'parrot', label: 'Parrot'},
    {value: 'spider', label: 'Spider'},
    {value: 'goldfish', label: 'Goldfish'}
  ];

  const App = () => (
    React__default["default"].createElement('div', null, [
      React__default["default"].createElement('label', {for: "pet-select"}, ["Choose a pet: "]),
      Dropdown({options: options, id: "pet-select"})
    ])
  );
  const rootElement = document.getElementById('root');
  document.title = 'Menus with React';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM);
