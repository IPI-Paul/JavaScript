import Header from "./Header"
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from '../16tut/About'
import Missing from '../16tut/Missing'
import Footer from '../16tut/Footer'
import EditPost from './EditPost'
import '../16tut/index.css'
import { Route, Routes } from 'react-router-dom'
import { DataProvider } from '../../services/DataContext'

const Tut21 = () => {  
  return (
    <div className="Tut16">
        <Header title='React JS Blog' />
        <DataProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<NewPost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </DataProvider>
        <Footer />
    </div>
  )
}

export default Tut21