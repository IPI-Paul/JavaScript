import React, { useEffect } from 'react'

const Child = ({ returnComment }) => {
  useEffect(() => 
    console.log('Function was called'),
    [returnComment]
  )
  return (
    <h3>{ returnComment('Pedro') }</h3>
  )
}

export default Child