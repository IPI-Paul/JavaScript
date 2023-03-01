import { useState } from "react"

const Content = () => {
  const [name, setName] = useState('Dave')
  const [count, setCount] = useState(0)
  const handleNameChange = () => {
    const names = ['Bob', 'Kevin', 'Dave']
    const int = Math.floor(Math.random() * 3)
    setName(names[int])
  }
  const handleClick = () => {
    setCount(prev => prev + 1)
    console.log(count)
  }
  const handleClick2 = () => {
    console.log(count)
  }
  const handleClick3 = (e) => {
    console.log(`${e.target.parentElement.previousSibling.innerText} was clicked`)
  }

  return (
    <main>
      <p onDoubleClick={handleClick}>
          Hello {name}!
      </p>
      <div className="d-flex flex-row">
        <button
          className="btn btn-secondary m-1"
          onClick={handleNameChange}
        >Change Name</button>
        <button
          className="btn btn-primary m-1"
          onClick={handleClick}
        >Click It</button>
        <button
          className="btn btn-warning m-1"
          onClick={handleClick2}
        >Click It</button>
        <button
          className="btn btn-danger m-1"
          onClick={(e) => handleClick3(e)}
        >Click It</button>
      </div>
    </main>
  )
}

export default Content