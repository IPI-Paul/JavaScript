import Square from "./Square"
import Input from './Input'
import { useState } from "react"
import '../04tut/App.css'


const Tut10 = () => {
  const [colourValue, setColourValue] = useState('')
  const [hexValue, setHexValue] = useState('')
  const [isDarkText, setIsDarkText] = useState(true)

  return (
    <div className="Tut10">
      <Square 
        colourValue={colourValue} 
        hexValue={hexValue}
        isDarkText={isDarkText}
      />
      <Input 
        colourValue={colourValue}
        setColourValue={setColourValue}
        setHexValue={setHexValue} 
        isDarkText={isDarkText}
        setIsDarkText={setIsDarkText}
      />
    </div>
  )
}

export default Tut10