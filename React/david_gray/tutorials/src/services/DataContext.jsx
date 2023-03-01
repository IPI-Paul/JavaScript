import { createContext, useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import api from './apiPosts'
import useAxiosFetch from '../hooks/useAxiosFetch'

const DataContext = createContext({})

export const DataProvider= ({ children }) => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const history = {push: useNavigate()}
  
  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  )

  useEffect(() => {
    setPosts(data)
  }, [data])
  
  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
      
    setSearchResults(filteredResults.reverse())
  }, [posts, search])
  
  return (
    <DataContext.Provider value={{
      search, setSearch, searchResults, fetchError, isLoading, format,
      posts, setPosts, api, history
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext