import { createSlice } from "@reduxjs/toolkit"
import { users } from '../../../interfaces/users'

const initialState = users

const usersSlice = createSlice({
  name: 'users02',
  initialState,
  reducers: {}
})

export const selectAllUsers = state => state.users02

export default usersSlice.reducer