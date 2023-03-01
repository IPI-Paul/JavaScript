import React, { useState } from 'react'

const StateTutorial = () => {
  const [counter, setCounter] = useState(0)
  const increment = () => setCounter(prevValue => prevValue + 1)
  const [inputValue, setInputValue] = useState('')

  return (
    <div className='example'>
      <div className="counter">
        {counter}
        <button onClick={increment}>Increment</button>
      </div>
      <div className="input">
        <input type="text" placeholder='enter something...' onChange={e => setInputValue(e.target.value)} value={inputValue} /> 
        {inputValue}
      </div>
    </div>
  )
}

export default StateTutorial;