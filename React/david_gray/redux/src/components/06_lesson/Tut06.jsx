import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { apiSlice } from './api/apiSlice'
import TodoList from './todos/TodoList'
import './index.css'

const Tut06 = () => {
  return (
    <div className="Tut06">
      <ApiProvider api={apiSlice}>
        <TodoList />
      </ApiProvider>
    </div>
  )
}

export default Tut06