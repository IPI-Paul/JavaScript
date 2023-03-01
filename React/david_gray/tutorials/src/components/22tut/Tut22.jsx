import Header from "../21tut/Header"
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from '../16tut/About'
import Missing from '../16tut/Missing'
import Footer from './Footer'
import EditPost from './EditPost'
import '../16tut/index.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from "react"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useStoreActions } from "easy-peasy"

const Tut22 = () => {  
  const setPosts = useStoreActions(actions => actions.setPosts)  
  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  )

  useEffect(() => {
    setPosts(data)
  }, [data, setPosts])

  return (
    <div className="Tut16">
        <Header title='React JS Blog' />
          <Nav />
          <Routes>
            <Route path="/" element={
              <Home 
                isLoading={isLoading}
                fetchError={fetchError}
              />
            } />
            <Route path="/post" element={<NewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        <Footer />
    </div>
  )
}

export default Tut22