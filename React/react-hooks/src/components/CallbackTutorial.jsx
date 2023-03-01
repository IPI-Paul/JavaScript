import React, { useCallback, useState } from 'react'
import Child from './Child'

const CallbackTutorial = () => {
  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState('Yo, please subscribe to the channel!')

  const returnComment = useCallback((name) => {
    return name + ': ' + data
  }, [data])

  return (
    <div className='d-flex flex-column p-3'>
      <Child returnComment={returnComment} />
      <div className='p-3'>
        <button
          onClick={() => setToggle(prev => !prev)}
          className='bg-primary text-white rounded-3'
        >
          Toggle
        </button>
      </div>
      {toggle && <h1> toggle </h1>}
    </div>
  )
}

export default CallbackTutorial