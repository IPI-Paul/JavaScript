import React from 'react'

const Box = (props) => {
  const {idx, on, toggle} = props
  // const [on, setOn] = React.useState(props.on)
  const styles = {
    backgroundColor: on ? '#222222' : '#cccccc'
  } 

  return (
    <div 
        style={styles} 
        key={idx} 
        className='boxes-box'
        onClick={toggle}
      ></div>
  )
}

export default Box