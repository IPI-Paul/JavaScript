import React from 'react'
import airbnbLogo from '../../images/airbnb-logo.png'

const Navbar = () => (
  <nav>
    <img src={airbnbLogo} alt='airbnb' className='nav--logo' />
  </nav>
);

export default Navbar;