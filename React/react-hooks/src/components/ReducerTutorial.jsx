import React, { useReducer } from 'react'

const ReducerTutorial = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return {...state, count: state.count + 1}
      case 'toggleShowtext':
        return {...state, showText: !state.showText}
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    showtext: true
  })

  return (
    <div className='d-flex flex-column'>
      <h1 className='m-2'>{state.count}</h1>
      <div className='mb-2'>
        <button
          onClick={() => {
            dispatch({type: 'INCREMENT'})
            dispatch({type: 'toggleShowtext'})
          }}
          className='rounded-1 bg-primary text-white'
        >
          Click Here
        </button>
      </div>
      {state.showText && <p>This is a text</p>}
    </div>
  )
}

export default ReducerTutorial;