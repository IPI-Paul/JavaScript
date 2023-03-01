import { useContext, useEffect, useState } from "react"
import finnHub from "../apis/finnHub"
import { WatchListContext } from "../context/WatchListContext"


const AutoComplete = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const { addStock } = useContext(WatchListContext)

  const renderDropdown = () => {
    const dropDownClass = search.length > 0 ? 'show' : ''
    return (
      <ul 
        className={`dropdown-menu ${dropDownClass}`}
        style={{
          height: '500px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          cursor: 'pointer'
        }}
      >
        {
          results.map(result => (
            <li 
              className="dropdown-item"
              key={result.Symbol}
              onClick={() => {
                addStock(result.Symbol)
                setSearch('')
              }}
            >
              {result.Name} ({result.Symbol})
            </li>
          ))
        }
      </ul>
    )
  }
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/quote', {
          params: {
            Symbol_like: search
          }
        })
        if(isMounted) {
          setResults(response.data)
        }
      } catch (error) {
        
      }
    }
    if(search.length > 0) {
      fetchData()
    } else {
      setResults([])
    }
    return () => (isMounted = false)
  }, [search])
  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input 
          type="text" 
          style={{backgroundColor: 'rgba(145, 158, 171, 0.04'}} 
          className='form-control'
          placeholder="Search"
          autoComplete="off"
          id="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>
  )
}

export default AutoComplete