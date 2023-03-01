import { useEffect } from "react"
import { createContext, useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { store } from "../app/store"
import { Provider } from "react-redux"
import { fetchUsers as fetchUsers03 } from "../components/03_lesson/users/usersSlice"
import { fetchUsers as fetchUsers05 } from "../components/05_lesson/users/usersSlice"
import { fetchPosts as fetchPosts04 } from '../components/04_lesson/posts/postsSlice'
import { fetchPosts as fetchPosts05 } from '../components/05_lesson/posts/postsSlice'
import { extendedApiSlice } from '../components/07_lesson/posts/postsSlice'

store.dispatch(fetchPosts04())
store.dispatch(fetchPosts05())
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate())
store.dispatch(fetchUsers03())
store.dispatch(fetchUsers05())

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
const [tutorial, setTutorial] = useState(
  JSON.parse(localStorage.getItem('react_series-redux')) 
  || ['Selector', 'App']
)
const [title, setTitle] = useState('')
document.title = title

useEffect(() => {
  if(tutorial[1] !== 'App') {
    setTitle('React Series: Redux - ' + tutorial[1])
  } else {
    setTitle('React Series: Redux - Home')
  }
  localStorage.setItem('react_series-redux', JSON.stringify(tutorial))
}, [tutorial])

return (
  <AppContext.Provider value={{tutorial, setTutorial}}>
    <Provider store={store}>
      <Router>
        {children.filter(child => tutorial.includes(child.type.name))}
      </Router>
    </Provider>
  </AppContext.Provider>
)
}