import './style.css';
import React from 'react';

const App = () => {
  const [isGoingOut, setIsGoingOut] = React.useState(true);
  
  const changeMind = () => {
    setIsGoingOut(prevState => !prevState);
  };

  return (
    <div className='ternary'>
      <h1 className='ternary--title'>Do I feel like going out tonight?</h1>
      <div className='ternary--value' onClick={changeMind}>
        <h1>{isGoingOut ? 'Yes' : 'No'}</h1>
      </div>
    </div>
  )
};

export default App;