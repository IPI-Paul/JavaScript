import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <label for="pet-select">Choose a pet: </label>

    <select id="pet-select">
      <option value="">--Please choose an option--</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  </div>
);
const rootElement = document.getElementById('root');
document.title = 'Menus with React';
ReactDOM.render(<App />, rootElement);