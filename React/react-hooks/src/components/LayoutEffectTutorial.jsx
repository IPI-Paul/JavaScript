import React, { useEffect, useLayoutEffect, useRef } from 'react'

const LayoutEffectTutorial = () => {
  const inputRef = useRef(null)

  useLayoutEffect(() => {
    console.log(inputRef.current.value)
  }, [])
  
  useEffect(() => {
    inputRef.current.value = 'Hello'
  }, [])
  
  return (
    <div className='layout d-flex justify-content-center p-2'>
      <input ref={inputRef} type="text" value='PEDRO' className="w-100 min-h-100 rounded-3" />
    </div>
  )
}

export default LayoutEffectTutorial