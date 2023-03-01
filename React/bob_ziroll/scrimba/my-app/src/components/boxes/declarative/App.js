import React from 'react'
import '../style.css'
import boxes from '../boxes'
import Box from './Box'

const App = () => {
  const [squares, setSquares] = React.useState(boxes)
  const toggle = (id) => {
    setSquares(prevSquares => {
      return prevSquares.map(d => d.id === id 
        ? ({...d, on: !d.on}) 
        : d
      )
    }
    )
  }
  
  const squareElements = squares.map((d, idx) => (
      <Box 
        on={d.on} 
        key={idx} 
        id={d.id}
        className='boxes-box'
        toggle={() => toggle(d.id)}
      />
    )
  )
  
  return (
    <main className='boxes-app'>
      {squareElements}
    </main>
  )
}

export default App