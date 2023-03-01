import React, { useRef } from 'react'
import Button from './Button'

const ImperativeHandle = () => {
  const buttonRef = useRef(null);

  return (
    <div className='p-2'>
      <button 
        className='m-2 rounded-3 bg-warning'
        onClick={() => {
          buttonRef.current.alterToggle()
        }}
      >
        Button From Parent
      </button>
      <Button ref={buttonRef} />
    </div>
  )
}

export default ImperativeHandle