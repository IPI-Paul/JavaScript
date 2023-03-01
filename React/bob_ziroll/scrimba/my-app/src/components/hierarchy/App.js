import React from 'react'
import Header from './Header'
import Body from './Body'
import './style.css'

const App = () => {
  const user = React.useState('Joe')[0]

  return (
    <div className='hierarchy-container'>
      <Header 
        user={user}
      />
      <Body 
        user={user}
      />
    </div>
  )
}

export default App