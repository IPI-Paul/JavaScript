import React from "react"

const WindowTracker = () => {
  const [windowWidth, setWindoWidth] = React.useState(window.innerWidth)
  React.useEffect(() => {
    const watchWidth = () => setWindoWidth(window.innerWidth)
    window.addEventListener('resize', watchWidth)
    return (() => {
      window.removeEventListener('resize', watchWidth)
    })
  }, [])
  return (
    <h1>Window width: {windowWidth}</h1>
  )
}
export default WindowTracker