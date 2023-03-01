import React, { useState } from "react"
import './style.css'

const App = () => {
  const [starWarsData, setstarWarsData] = React.useState({})
  const [id, setId] = useState(1)
  React.useEffect(() => {
    fetch(`http://localhost:5000/people/${id}`)
      .then(res => res.json())
      .then(data => setstarWarsData(data))
  }, [id])

  const handleClick = (num) => setId(prevState => 
    prevState + num > 0 ? prevState + num : prevState
    )
  
  return (
    <div>
      <div className="api-btn">
        <button onClick={() => handleClick(-1)}>Previous</button>
        <button onClick={() => handleClick(1)}>Next</button>
      </div>
      <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
    </div>
  )
}

export default App