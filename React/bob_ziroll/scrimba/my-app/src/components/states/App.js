import './style.css';
import React from 'react';

const App = () => {
  const [isImportant, setIsImportant] = React.useState('Yes');
  
  const handleClick = () => (
    setIsImportant(isImportant === 'Yes' ? 'No' : 'Yes')
  );

  return (
    <div className='state'>
      <h1 className='state--title'>Is state important to know?</h1>
      <div className='state--value' onClick={handleClick}>
        <h1>{isImportant}</h1>
      </div>
    </div>
  )
};

export default App;