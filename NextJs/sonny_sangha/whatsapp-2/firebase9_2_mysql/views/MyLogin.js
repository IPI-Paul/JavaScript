import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { validateLogin } from '@/firebase';

const MyLogin =() => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [externalWindow, setExternalWindow] = useState()
  let idx = 0

  const handleSubmit = async () => {
    const response = await validateLogin('whatsAppLogin', email, password)
    if (!response) {
      return null
    }
    externalWindow.close()
    return response
  }

  const handleWindow = (e) => {
    setEmail(e.target.value)
    if (idx == 0) {
      setExternalWindow(e.target.ownerDocument.defaultView)
      idx = 1
    }
  }
  
  return (
    <div className='modal'>
      <div className='heading'>Login With Credentials</div>
      <div className='content'>          
        <div>
            <form id='frm' action='POST'>
              <div>
                <label className="section-header" htmlFor="email">Email</label>
                <input onChange={(e) => handleWindow(e)} value={email} name='email' id="email" type="email" size={32} placeholder="me@email.com" />
              </div>
              <div>
                <label className="section-header" htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" type="password"  placeholder='password' />
              </div>
              <button type='submit' hidden onClick={handleSubmit} />
            </form>
          </div>
      </div>
      <div className='actions' id='submit'>
        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  )
}

export default MyLogin