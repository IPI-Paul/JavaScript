import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from './Dropdown';
import { useState } from 'ipi';

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
  const [selectedValue, setSelectedValue] = useState({obj: 'selectedValue', state: initialValue});
  console.log(selectedValue);
  return (
    <div>
      <label for={id}>Choose a pet: </label>
      <Dropdown 
        options={options} 
        id={id} 
        selectedValue={initialValue}
        onSelectedValueChange={(value) => setSelectedValue({obj: 'selectedValue', state: value})}  
      />
    </div>
  )
};
window.App = App;
window.rootElement = document.getElementById('root');
document.title = 'Menus with React';
ReactDOM.render(<App />, window.rootElement);