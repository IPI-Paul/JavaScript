import './style.css';
import React from 'react';

const App = () => {
  const [things, setThings] = React.useState(["Thing 1", "Thing 2"]);
  const thingsElements = things.map((thing, idx) => 
    <p key={idx} className="adding-p">{thing}</p>
  );
  const addItem = () => {
    const newThingText = `Thing ${things.length + 1}`;
    setThings(prevState => [...prevState, newThingText])
  };

  return (
    <div className="adding-container">
      <button
        onClick={addItem}
        className="adding-button"
      >
        Add Item
      </button>
      {thingsElements}
    </div>
  )
};

export default App;