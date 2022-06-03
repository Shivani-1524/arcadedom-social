import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const namespace = 'posts'

export const getPosts = createAsyncThunk(`/${namespace}/getPosts`, async () => {
    const { data } = await axios.get("/api/posts")
    console.log(data)
    return data.posts
})

export const postsSlice = createSlice({
    name: namespace,
    initialState: { posts: [], status: null },
    reducers: {
        sortPosts: (state, action) => {
            switch (action.payload) {
                case "trending":
                    console.log(new Date())
                    state.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) || b.likes.likeCount - a.likes.likeCount)
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
            state.posts = payload.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            state.status = 'success'
        },
        [getPosts.rejected]: (state, { payload }) => {
            state.status = 'failed'
        }
    }
})

export const { sortPosts } = postsSlice.actions
export default postsSlice.reducer