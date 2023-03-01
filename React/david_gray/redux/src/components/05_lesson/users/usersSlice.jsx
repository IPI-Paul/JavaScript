import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const USERS_URL = 'http://localhost:3500/users'

const initialState = []

export const fetchUsers = createAsyncThunk('users05/fetchUsers', async () => {
  const response = await axios.get(USERS_URL)
  return response.data
})

const usersSlice = createSlice({
  name: 'users05',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectAllUsers = state => state.users05

export const selectUserById = (state, userId) => 
  state.users05.find(user => user.id === userId)

export default usersSlice.reducer