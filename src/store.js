import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './Features/postsSlice'
import modalReducer from './Features/modalSlice'
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        modal: modalReducer
    },
})