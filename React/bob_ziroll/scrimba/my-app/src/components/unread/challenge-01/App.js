import '../style.css'
import React from 'react'

const App = () => {
  const messages = React.useState(['a', 'b'])[0]

  return (
    <div className='unread-container'>
      {
        messages.length > 0 && 
        <h1>You have {messages.length} unread messages</h1>
      }
    </div>
  )
}

export default App