import './style.css'

const App = () => {
  const handleClick = () => (
    console.log('I was clicked')
  );
  const handleMouseOver = (event) => (
    console.log(event.clientX, event.clientY)
  );

  return (
    <div className="handler-container">
      <img 
        src="../../images/Sport-06.jpg" 
        alt="Sport 06" 
        onMouseOver={handleMouseOver}
      />
      <button onClick={handleClick}>Click me</button>
    </div>
  )
};

export default App;