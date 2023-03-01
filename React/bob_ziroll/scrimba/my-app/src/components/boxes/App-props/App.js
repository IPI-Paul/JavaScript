import React from 'react'
import '../style.css'
import boxes from '../boxes'

const App = (props) => {
  let {darkMode} = props.obj
  const squares = React.useState(boxes)[0]
  
  const styles = {
    backgroundColor: darkMode ? '#222222' : '#cccccc'
  }
  
  const squareElements = squares.map((d, idx) => {
    darkMode = d.on
    return (
      <div 
        style={styles} 
        key={idx} 
        className='boxes-box'
      ></div>
      )
    }
  )
  
  return (
    <main className='boxes-app'>
      {squareElements}
    </main>
  )
}

export default App