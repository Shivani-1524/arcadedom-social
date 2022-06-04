import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios'
import { getTrendingPosts } from "../Utils/getTrendingPosts";

const namespace = 'posts'

export const getPosts = createAsyncThunk(`/${namespace}/getPosts`, async () => {
    const { data } = await axios.get("/api/posts")
    return data.posts
})



export const postsSlice = createSlice({
    name: namespace,
    initialState: { posts: [], status: null },
    reducers: {
        sortPosts: (state, action) => {
            switch (action.payload) {
                case "trending":
                    state.posts = getTrendingPosts(current(state.posts))
                    // state.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    break;
                case 'newest':
                    state.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    break;
                case 'oldest':
                    state.posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    break;
                default:
                    return state.posts;
            }
        },
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            state.posts = payload.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            state.status = 'success'
        },
        [getPosts.rejected]: (state, { payload }) => {
            state.status = 'failed'
        }
    }
})

export const { sortPosts } = postsSlice.actions
export default postsSlice.reducer