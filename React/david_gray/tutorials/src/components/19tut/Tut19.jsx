import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from "../16tut/Header"
import Nav from '../16tut/Nav'
import Home from '../16tut/Home'
import NewPost from '../16tut/NewPost'
import PostPage from './PostPage'
import About from '../16tut/About'
import Missing from '../16tut/Missing'
import Footer from '../16tut/Footer'
import '../16tut/index.css'
import { useState } from 'react'
import { format } from 'date-fns'
import { useEffect } from 'react'
import api from '../../services/apiPosts'
import EditPost from './EditPost'

const Tut19 = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const history = {push: useNavigate()}

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id)
      setPosts(postsList)
      history.push('/')
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditTitle('')
      setEditBody('')
      history.push('')
    } catch (error) {
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      history.push('/')
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (error) {
        if(error.response){
          console.log(error.response.data, error.response.status, 
            error.response.headers)
        } else {
          console.log(`Error: ${error.message}`)
        }
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
      
    setSearchResults(filteredResults.reverse())
  }, [posts, search])
  
  return (
    <div className="Tut16">
        <Header title='React JS Blog' />
        <Nav search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home posts={searchResults} />} />
          <Route path="/post" element={
            <NewPost 
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          } />
          <Route path="/edit/:id" element={
            <EditPost 
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          } />
          <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default Tut19