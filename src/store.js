import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './Features/postsSlice'
import modalReducer from './Features/modalSlice'
import authReducer from './Features/authSlice'
import userReducer from './Features/usersSlice'

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        modal: modalReducer,
        auth: authReducer,
        user: userReducer,
    },
})