import React from 'react';
import emptyStar from '../../images/star-empty.svg';
import starFilled from '../../images/star-filled.svg';

const Star = (props) => {
  const {isFilled, handleClick} = props;
  let starIcon = isFilled ? starFilled : emptyStar;

  return (
    <img 
      src={starIcon}
      className='card--favorite'
      onClick={handleClick} 
      alt='Card Favorite'
    />
  );
};

export default Star;