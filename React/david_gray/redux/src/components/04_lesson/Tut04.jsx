import AddPostForm from './posts/AddPostForm'
import PostsList from './posts/PostsList'
import './index.css'
import SinglePostPage from './posts/SinglePostPage'
import EditPostForm from './posts/EditPostForm'
import Layout from './Layout'
import { Routes, Route } from 'react-router-dom'

const Tut04 = () => {
  return (
    <div className='Tut04'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PostsList />} />
          <Route path='post'>
            <Route index element={<AddPostForm />} />
            <Route path=':postId' element={<SinglePostPage />} />
            <Route path='edit/:postId' element={<EditPostForm />} />
          </Route>  
        </Route>
      </Routes>
    </div>
  )
}

export default Tut04