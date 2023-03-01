import '../style.css'
import React from 'react'

const App = () => {
  const messages = React.useState(['a', 'b'])[0]

  return (
    <div className='unread-container'>
      {
        messages.length === 0 
          ? <h1>You're all caught up!'</h1>
          : <h1>You have {messages.length} unread {
              messages.length > 1 ? 'messages' : 'message'
            }</h1>
      }
    </div>
  )
}

export default App