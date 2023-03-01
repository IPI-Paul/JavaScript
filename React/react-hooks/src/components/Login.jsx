import React, { useContext } from 'react'
import { AppContext } from './ContextTutorial'

const Login = () => {
  const {setUsername} = useContext(AppContext)
  return (
    <div className='p-3 d-flex justify-content-center'>
      <input type="text" id='username' onChange={e => setUsername(e.target.value)} className='rounded-3 w-25' />
    </div>
  )
}

export default Login