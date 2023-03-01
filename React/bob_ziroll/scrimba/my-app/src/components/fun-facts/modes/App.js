import React from 'react'
import Main from './Main'
import Navbar from './Navbar'
import '../style.css'

const App = () => {
  const [mode, setMode] = React.useState(false)
  return (
    <div className='fun-facts-container'>
      <Navbar 
        darkMode={mode}
        toggleDarkMode={() => setMode(prevMode => !prevMode)}
      />
      <Main 
        darkMode={mode}
      />
    </div>
  )
}

export default App