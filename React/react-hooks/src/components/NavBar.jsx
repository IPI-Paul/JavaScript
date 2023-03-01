import React, { useState } from 'react'

const NavBar = ({ setExample }) => {
  const [option, setOption] = useState('')
  const changeExample = e => {
    if(e.target.value !== '') {
      setExample(e.target.value)
      setOption('')
    }
  }

  return (
    <div>
      <select id="examples" className="navbar" value={option} onChange={changeExample}>
        <option value=''>Select an Example</option>
        <option value="callback">Callback Tutorial</option>
        <option value="context">Context Tutorial</option>
        <option value="effect">Effect Tutorial</option>
        <option value="imperative">Imperative Handle</option>
        <option value="layout">Layout Effect Tutorial</option>
        <option value="memo">Memo Tutorial</option>
        <option value="reducer">Reducer Tutorial</option>
        <option value="ref">Ref Tutorial</option>
        <option value="state">State Tutorial</option>
      </select>
    </div>
  )
}

export default NavBar;