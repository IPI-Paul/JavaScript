import colorNames from 'colornames'

const Input = ({ 
    colourValue, setColourValue, setHexValue, isDarkText, setIsDarkText 
  }) => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <label>Add Colour Name: </label>
      <input 
        type="text" 
        autoFocus 
        placeholder="Add colur name"
        required
        value={colourValue}
        onChange={e => {
          setColourValue(e.target.value)
          setHexValue(colorNames(e.target.value))
        }}
      />
      <button
        type='button'
        onClick={() => setIsDarkText(prev => !prev)}
        className='input-btn'
      >
        Toggle Text Colour
      </button>
    </form>
  )
}

export default Input