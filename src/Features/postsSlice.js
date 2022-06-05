import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios'
import { getTrendingPosts } from "../Utils/getTrendingPosts";

const namespace = 'posts'

export const getPosts = createAsyncThunk(`/${namespace}/getPosts`, async () => {
    const { data } = await axios.get("/api/posts")
    return data.posts
})
export const getUserPosts = createAsyncThunk(`/${namespace}/getPosts`, async (username) => {
    const { data } = await axios.get(`/api/posts/user/${username}`)
    return data.posts
})
export const createPost = createAsyncThunk(`/${namespace}/getPosts`, async () => {
    const { data } = await axios.get("/api/posts")
    return data.posts
})
export const deletePost = createAsyncThunk(`/${namespace}/getPosts`, async (postId) => {
    const { data } = await axios.get(`/api/posts/${postId}`)
    return data.posts
})
export const editPost = createAsyncThunk(`/${namespace}/getPosts`, async (postId) => {
    const { data } = await axios.get(`/api/posts/edit/${postId}`)
    return data.posts
})



export const likePost = createAsyncThunk(`/${namespace}/likePost`, async (postId) => {
    const { data } = await axios.post(`/api/posts/like/${postId}`)
    return data.posts
})
export const dislikePost = createAsyncThunk(`/${namespace}/dislikePost`, async (postId) => {
    const { data } = await axios.post(`/api/posts/dislike/${postId}`)
    return data.posts
})

//boomarks
export const bookmarkPost = createAsyncThunk(`/${namespace}/bookmarkPost`, async (postId) => {
    const { data } = await axios.post(`/api/users/bookmark/${postId}`)
    return data
})
export const removeBookmark = createAsyncThunk(`/${namespace}/removeBookmark`, async (postId) => {
    const { data } = await axios.post(`/api/users/remove-bookmark/${postId}`);
    return data
})
export const getAllBookmarks = createAsyncThunk(`/${namespace}/getBookmarks`, async () => {
    const { data } = await axios.get(`/api/users/bookmark`)
    return data.bookmarks
})


//comments
export const postComment = createAsyncThunk(`/${namespace}/dislikePost`, async (postId) => {
    const { data } = await axios.get(`/api/posts/dislike/${postId}`)
    return data.posts
})
export const getAllComments = createAsyncThunk(`/${namespace}/dislikePost`, async (postId) => {
    const { data } = await axios.get(`/api/posts/dislike/${postId}`)
    return data.posts
})
export const editComment = createAsyncThunk(`/${namespace}/dislikePost`, async (postId) => {
    const { data } = await axios.get(`/api/posts/dislike/${postId}`)
    return data.posts
})
export const deleteComment = createAsyncThunk(`/${namespace}/dislikePost`, async (postId) => {
    const { data } = await axios.get(`/api/posts/dislike/${postId}`)
    return data.posts
})



const initialStateValue = {
    posts: [],
    bookmarks: [],
    postStatus: null,
    loadCommentStatus: null,
    likeStatus: { status: '', loadId: null },
    bookmarkStatus: { status: '', loadId: null },
}
export const postsSlice = createSlice({
    name: namespace,
    initialState: initialStateValue,
    reducers: {
        sortPosts: (state, action) => {
            switch (action.payload) {
                case "trending":
                    state.posts = getTrendingPosts(current(state.posts))
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
        [getPosts.pending]: (state) => {
            state.status = 'loading'
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            state.posts = payload.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            state.status = 'success'
        },
        [getPosts.rejected]: (state) => {
            state.status = 'failed'
        },


        [likePost.pending]: ({ likeStatus }, { meta }) => {
            likeStatus.status = 'loading';
            likeStatus.loadId = meta.arg;
        },
        [likePost.fulfilled]: (state, { payload }) => {
            state.posts = payload;
            state.likeStatus.status = 'success';
        },
        [likePost.rejected]: ({ likeStatus }) => {
            likeStatus.status = 'failed';
        },


        [dislikePost.pending]: ({ likeStatus }, { meta }) => {
            likeStatus.status = 'loading';
            likeStatus.loadId = meta.arg;
        },
        [dislikePost.fulfilled]: (state, { payload }) => {
            state.posts = payload;
            state.likeStatus.status = 'success';
        },
        [dislikePost.rejected]: ({ likeStatus }) => {
            likeStatus.status = 'failed';
        },


        [removeBookmark.pending]: ({ bookmarkStatus }, { meta }) => {
            bookmarkStatus.status = 'loading';
            bookmarkStatus.loadId = meta.arg;
        },
        [removeBookmark.fulfilled]: (state, { payload }) => {
            // state.posts = payload;
            state.bookmarks = payload.bookmarks;
            state.bookmarkStatus.status = 'success';
        },
        [removeBookmark.rejected]: (state, { payload }) => {
            state.bookmarkStatus.status = 'failed'
            console.log(payload)
        },


        [bookmarkPost.pending]: ({ bookmarkStatus }, { meta }) => {
            bookmarkStatus.status = 'loading';
            bookmarkStatus.loadId = meta.arg;
        },
        [bookmarkPost.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.bookmarks = payload.bookmarks;
            state.bookmarkStatus.status = 'success';
        },
        [bookmarkPost.rejected]: ({ bookmarkStatus }, { payload }) => {
            bookmarkStatus.status = 'failed'
            console.log(payload)
        },


        [getAllBookmarks.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getAllBookmarks.fulfilled]: (state, { payload }) => {
            state.posts = payload.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            state.status = 'success'
        },
        [getAllBookmarks.rejected]: (state, { payload }) => {
            state.status = 'failed'
        },
    }
})

export const { sortPosts } = postsSlice.actions
export default postsSlice.reducer