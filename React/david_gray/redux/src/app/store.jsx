import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterReducer from '../components/01_lesson/counter/counterSlice'
import postsReducer02 from '../components/02_lesson/posts/postsSlice'
import postsReducer03 from '../components/03_lesson/posts/postsSlice'
import postsReducer04 from '../components/04_lesson/posts/postsSlice'
import postsReducer05 from '../components/05_lesson/posts/postsSlice'
import usersReducer02 from '../components/02_lesson/users/usersSlice'
import usersReducer03 from '../components/03_lesson/users/usersSlice'
import usersReducer05 from '../components/05_lesson/users/usersSlice'
import { apiSlice } from '../components/07_lesson/api/apiSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts02: postsReducer02,
    posts03: postsReducer03,
    posts04: postsReducer04,
    posts05: postsReducer05,
    users02: usersReducer02,
    users03: usersReducer03,
    users05: usersReducer05,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware)
})