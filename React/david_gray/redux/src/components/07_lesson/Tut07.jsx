import AddPostForm from './posts/AddPostForm'
import PostsList from './posts/PostsList'
import '../04_lesson/index.css'
import SinglePostPage from './posts/SinglePostPage'
import EditPostForm from './posts/EditPostForm'
import UsersList from '../05_lesson/users/UsersList'
import UserPage from './users/UserPage'
import Layout from './Layout'
import { Routes, Route, Navigate } from 'react-router-dom'

const Tut07 = () => {
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
          <Route path='user'>
            <Route index element={<UsersList />} />
            <Route path=':userId' element={<UserPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </div>
  )
}

export default Tut07