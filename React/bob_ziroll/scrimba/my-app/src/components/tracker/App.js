import React from "react"
import './style.css'
import WindowTracker from "./WindowTracker"

const App = () => {
  const [show, setShow] = React.useState(true)
  const toggle = () => setShow(prevState => !prevState)
  return (
    <div className="tracker">
    <div className="container">
      <button onClick={toggle}>
        Toggle Window Tracker
      </button>
      {show && <WindowTracker />}
    </div>
    </div>
  )
}

export default App