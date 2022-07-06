import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Reducer/userReducer'
import todosReducer from '../Reducer/todosReducer'
export const store = configureStore({ reducer: {
     auth: userReducer,
     todos: todosReducer
    } })
