import React from 'react'
import reactLogo from '../../../images/react-icon-small.png'

const Navbar = (props) => {
  const {darkMode, toggleDarkMode} = props
  return (
    <nav className={'funFacts-' + (darkMode ? 'dark' : 'light')}>
      <img 
        src={reactLogo} 
        alt='React-Logo' 
        className='nav-icon'
      />
      <h3 className='nav--logo_text'>React Facts</h3>
      <div className='toggler'>
        <p className='toggler--light'>Light</p>
        <div
          className='toggler--slider'
          onClick={toggleDarkMode}
        >
          <div className='toggler--slider--circle'></div>
        </div>
        <p className='toggler--dark'>Dark</p>
      </div>
    </nav>
  )
}

export default Navbar