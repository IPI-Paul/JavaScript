import React from 'react';

const Count = (props) => {
  const {number} = props;
  return (
    <div className='counter--count'>
      <h1>{number}</h1>
    </div>
  );
};

export default Count;