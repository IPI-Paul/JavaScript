import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const USERS_URL = 'http://localhost:3500/users'

const initialState = []

export const fetchUsers = createAsyncThunk('users03/fetchUsers', async () => {
  const response = await axios.get(USERS_URL)
  return response.data
})

const usersSlice = createSlice({
  name: 'users03',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectAllUsers = state => state.users03

export default usersSlice.reducer