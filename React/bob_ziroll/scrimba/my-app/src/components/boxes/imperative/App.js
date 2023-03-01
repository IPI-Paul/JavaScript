import React from 'react'
import '../style.css'
import boxes from '../boxes'
import Box from './Box'

const App = () => {
  const [squares, setSquares] = React.useState(boxes)
  const toggle = (id) => {
    setSquares(prevSquares => {
      const newSquares = []
      for(let i = 0; i < prevSquares.length; i++) {
        const currentSquare = prevSquares[i]
        if(currentSquare.id === id) {
          const updatedSquare = {
            ...currentSquare,
            on: !currentSquare.on
          }
          newSquares.push(updatedSquare)
        } else {
          newSquares.push(currentSquare)
        }
      }
      return newSquares
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