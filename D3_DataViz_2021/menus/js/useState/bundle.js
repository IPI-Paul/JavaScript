(function (React, ReactDOM, ipi) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
    React__default["default"].createElement('select', {id: id, onChange: event => onSelectedValueChange(event.target.value)}, [
      options.map(({value, label}) => (
        React__default["default"].createElement('option', {value: value, selected: value === selectedValue}, [label])
      ))
    ])
  );

  const options = [
    { value: '', label: '--Please choose an option--' },
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'hamster', label: 'Hamster' },
    { value: 'parrot', label: 'Parrot' },
    { value: 'spider', label: 'Spider' },
    { value: 'goldfish', label: 'Goldfish' }
  ];

  let id = "pet-select";
  let initialValue = 'hamster';

  const App = () => {
    const [selectedValue, setSelectedValue] = ipi.useState({obj: 'selectedValue', state: initialValue});
    console.log(selectedValue);
    return (
      React__default["default"].createElement('div', null, [
        React__default["default"].createElement('label', {for: id}, ["Choose a pet: "]),
        Dropdown({
          options: options,
          id: id,
          selectedValue: initialValue,
          onSelectedValueChange: (value) => setSelectedValue({obj: 'selectedValue', state: value})}
        )
      ])
    )
  };
  window.App = App;
  window.rootElement = document.getElementById('root');
  document.title = 'Menus with React';
  ReactDOM__default["default"].render(App(), window.rootElement);

})(React, ReactDOM, ipi);
