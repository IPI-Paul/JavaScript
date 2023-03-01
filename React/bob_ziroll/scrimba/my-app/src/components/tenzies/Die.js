import React from "react"

const Die = (props) => {
  const {hold, value, held} = props
  const styles = {
    backgroundColor: held ? '#59E391' : 'white'
  }
  
  return (
    <div className="die-face" style={styles} onClick={() => hold(value)}>
      <h1 
        className="die-num" 
      >{value}</h1>
    </div>
  )
}

export default Die