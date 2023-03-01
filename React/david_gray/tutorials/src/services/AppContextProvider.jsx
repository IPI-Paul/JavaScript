import { useEffect } from "react"
import { createContext, useState } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { StoreProvider } from "easy-peasy"
import store from "./store"


export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
const [tutorial, setTutorial] = useState(
  JSON.parse(localStorage.getItem('react_series')) || ['Selector', 'App']
)
const [title, setTitle] = useState('')
document.title = title

useEffect(() => {
  if(tutorial[1] !== 'App') {
    setTitle('React Series - ' + tutorial[1])
  } else {
    setTitle('React Series - Home')
  }
  localStorage.setItem('react_series', JSON.stringify(tutorial))
}, [tutorial])

return (
  <AppContext.Provider value={{tutorial, setTutorial}}>
    <StoreProvider store={store}>
      <Router>
        {children.filter(child => tutorial.includes(child.type.name))}
      </Router>
    </StoreProvider>
  </AppContext.Provider>
)
}