import React from 'react'

const Joke = ({setup, punchline}) => {
  const [isShown, setIsShown] = React.useState(false)
  const toggleShown = () => setIsShown(prevState => !prevState)
  return (
    <div className="joke-container">
      {setup && <h3>Setup: {setup}</h3>}
      {isShown && <p>Punchline: {punchline}</p>}
      <button 
        onClick={toggleShown}
      >{isShown ? 'Hide' : 'Show'} Punchine</button>
      <hr />
    </div>
  )
}
export default Joke;