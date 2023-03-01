import { createSlice, nanoid } from "@reduxjs/toolkit"
import { posts } from "../../../interfaces/posts"

const initialState = posts

const postsSlice = createSlice({
  name: 'posts02',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          }
        }
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if(existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  }
})

export const selectAllPosts = (state) => state.posts02

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer