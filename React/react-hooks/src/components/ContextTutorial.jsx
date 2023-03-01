import React, { createContext, useState } from 'react'
import Login from './Login'
import User from './User'

export const AppContext = createContext(null)

const ContextTutorial = () => {
  const [username, setUsername] = useState('')

  return (
    <AppContext.Provider className="d-flex flex-column p2" value={{username, setUsername}}>
      <Login />
      <User />
    </AppContext.Provider>
  )
}

export default ContextTutorial