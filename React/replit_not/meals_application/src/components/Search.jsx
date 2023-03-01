import { useState } from "react";
import { useGlobalContext } from "../services/AppProvider";

const Search = () => {
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
  const [text, setText] = useState('')
  
  const handleChange = (e) => setText(e.target.value)
  const handleSubmit = (e) => {
    e.preventDefault()
    if(text) {
      setSearchTerm(text)
      setText('')
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm('')
    fetchRandomMeal()
  }

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="form-input" 
          placeholder="type favourite meal"
          onChange={handleChange}
          value={text}
        />
        <button className="btn" type="submit">Search</button>
        <button 
          className="btn btn-hipster" 
          type="button"
          onClick={handleRandomMeal}
        >Suprise Me!</button>
      </form>
    </header>
  )
}

export default Search