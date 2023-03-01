import React, { useContext } from 'react'
import { AppContext } from '../services/AppContextProvider'

const Selector = () => {
  const {setTutorial} = useContext(AppContext)
  const tutorials = ['Tut01', 'Tut02', 'Tut03', 'Tut04', 'Tut05', 'Tut06', 
    'Tut07'
  ]

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <span 
        onClick={(e) => {
          setTutorial(['Selector', 'App'])
        }} 
        className="navbar-brand" 
        style={{ cursor: 'pointer '}}
      >React Series Tutorials </span>
      <div 
        className="collapse navbar-collapse" 
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown">
            <a 
              href="/" 
              className="nav-link dropdown-toggle" 
              id="navbarDropdown" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Select a Tutorial
            </a>
            <ul 
              className="dropdown-menu navbar-dark bg-dark" 
              aria-labelledby="navbarDropdown"
            >
              {tutorials.map((tut, idx) => (
                <li 
                  key={idx}
                  onClick={() => setTutorial(['Selector', tut])}
                    className="dropdown-item text-danger"
                    style={{cursor: 'pointer'}}
                >
                  <span>
                    {tut}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Selector