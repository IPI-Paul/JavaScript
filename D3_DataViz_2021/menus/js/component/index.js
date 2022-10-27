import React from 'react';
import ReactDOM from 'react-dom';

const Dropdown = ({options, id}) => (
  <select id={id}>
    <option value="">--Please choose an option--</option>
    {options.map(({value, label}) => (
      <option value={value}>{label}</option>
    ))}
  </select>
);

const options = [
  {value: 'dog', label: 'Dog'},
  {value: 'cat', label: 'Cat'},
  {value: 'hamster', label: 'Hamster'},
  {value: 'parrot', label: 'Parrot'},
  {value: 'spider', label: 'Spider'},
  {value: 'goldfish', label: 'Goldfish'}
]

const App = () => (
  <div>
    <label for="pet-select">Choose a pet: </label>
    <Dropdown options={options} id="pet-select" />
  </div>
);
const rootElement = document.getElementById('root');
document.title = 'Menus with React';
ReactDOM.render(<App />, rootElement);