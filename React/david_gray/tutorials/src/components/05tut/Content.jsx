const Content = () => {
  const handleNameChange = () => {
    const names = ['Bob', 'Kevin', 'Dave']
    const int = Math.floor(Math.random() * 3)
    return names[int]
  }
  const handleClick = () => {
    console.log('You clicked it')
  }
  const handleClick2 = (name) => {
    console.log(`${name} was clicked`)
  }
  const handleClick3 = (e) => {
    console.log(`${e.target.parentElement.previousSibling.innerText} was clicked`)
  }

  return (
    <main>
      <p onDoubleClick={handleClick}>
          Hello {handleNameChange()}!
      </p>
      <div className="d-flex flex-row">
        <button
          className="btn btn-primary m-1"
          onClick={handleClick}
        >Click It</button>
        <button
          className="btn btn-warning m-1"
          onClick={() => handleClick2('Dave')}
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