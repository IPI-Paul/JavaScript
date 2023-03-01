import './style.css';
import React from 'react';
import Count from './count';

const App = () => {
  const [count, setCount] = React.useState(0)
  const handleClick = (event) => ((console.log(event.target.className),
    setCount(prevCount => 
      event.target.className === 'counter--minus' 
        ? prevCount - 1 >= 0 
          ? prevCount - 1
          : 0
        : prevCount + 1 
    ))
  );
  return (
    <div className='counter'>
      <button onClick={handleClick} className='counter--minus'>-</button>
      <Count number={count} />
      <button onClick={handleClick} className='counter--plus'>+</button>
    </div>
  );
};

export default App;