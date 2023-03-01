

const Square = ({ colourValue, hexValue, isDarkText }) => {
  return (
    <section 
      className="square"
      style={{ 
        backgroundColor: colourValue,
        color: isDarkText ? '#000' : '#fff'
      }}
    >
      <p>{colourValue ? colourValue : 'Empty Value'}</p>
      <p>{hexValue ? hexValue : null}</p>
    </section>
  )
}

Square.defaultProps = {
  colourValue: 'Empty Colour Value'
}

export default Square