import React, { forwardRef, useImperativeHandle, useState } from 'react'

const Button = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false)

  useImperativeHandle(ref, () => ({
    alterToggle() {
      setToggle(prev => !prev)
    }
  }))

  return (
    <div className='p-2 d-flex flex-column'>
      <div>
        <button 
          onClick={() => {
            setToggle(prev => !prev)
          }} 
          className='flex-1 mb-3 rounded-3 bg-primary text-white'
        >
          Button From Child
        </button>
      </div>
      {toggle && <span>Toggle</span>}
    </div>
  )
})

export default Button