import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios'
import { getTrendingPosts } from "../Utils/getTrendingPosts";

const namespace = 'posts'


export const getPosts = createAsyncThunk(`/${namespace}/getPosts`, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("/api/posts")
        return data.posts
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})
export const getUserPosts = createAsyncThunk(`/${namespace}/getPosts`, async (username) => {
    const { data } = await axios.get(`/api/posts/user/${username}`)
    return data.posts
})
export const createPost = createAsyncThunk(`/${namespace}/getPosts`, async ({ postData }, { rejectWithValue }) => {
    console.log(postData);
    try {
        const { data } = await axios.post("/api/posts", { postData });
        console.log(data.posts);
        return data.posts;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})
export const deletePost = createAsyncThunk(`/${namespace}/deletePost`, async (postId, { rejectWithValue }) => {
    try {
        const { data } = await axios.delete(`/api/posts/${postId}`)
        return data.posts
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})
export const editPost = createAsyncThunk(`/${namespace}/editPost`, async ({ postId, postData }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/api/posts/edit/${postId}`, { postData })
        return data.posts
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})
export const likePost = createAsyncThunk(`/${namespace}/likePost`, async (postId, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/api/posts/like/${postId}`)
        console.log("like data", data)
        return data.posts
    } catch (err) {
        return rejectWithValue(err.response.data)
    }

})
export const dislikePost = createAsyncThunk(`/${namespace}/dislikePost`, async (postId, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/api/posts/dislike/${postId}`)
        return data.posts
    }
    catch (err) {
        return rejectWithValue(err.response.data);
    }
})

//boomarks
export const bookmarkPost = createAsyncThunk(`/${namespace}/bookmarkPost`, async (postId, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/api/users/bookmark/${postId}`)
        return data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})
export const removeBookmark = createAsyncThunk(`/${namespace}/removeBookmark`, async (postId, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/api/users/remove-bookmark/${postId}`);
        return data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
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
    gifUrlSelected: '',
    sortedBy: 'newest',
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
                    state.sortedBy = "trending"
                    break;
                case 'newest':
                    state.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    state.sortedBy = "newest"
                    break;
                case 'oldest':
                    state.posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    state.sortedBy = "oldest"
                    break;
                default:
                    return state.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            }
        },
        gifSelection: (state, action) => {
            state.gifUrlSelected = action.payload
        }
    },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.postStatus = 'loading'
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            state.posts = payload
            state.postStatus = 'success'
        },
        [getPosts.rejected]: (state) => {
            state.postStatus = 'failed'
        },

        [createPost.pending]: (state) => {
            state.postStatus = 'loading'
        },
        [createPost.fulfilled]: (state, { payload }) => {
            state.posts = payload
            state.postStatus = 'success'
        },
        [createPost.rejected]: (state, { payload }) => {
            state.postStatus = 'failed'
            console.log(payload)
        },

        [deletePost.pending]: (state) => {
            state.postStatus = 'loading'
        },
        [deletePost.fulfilled]: (state, { payload }) => {
            state.posts = payload
            state.postStatus = 'success'
        },
        [deletePost.rejected]: (state, { payload }) => {
            state.postStatus = 'failed'
            console.log(payload)
        },

        [editPost.pending]: (state) => {
            state.postStatus = 'loading'
        },
        [editPost.fulfilled]: (state, { payload }) => {
            state.posts = payload
            state.postStatus = 'success'
        },
        [editPost.rejected]: (state, { payload }) => {
            state.postStatus = 'failed'
            console.log(payload)
        },


        [likePost.pending]: ({ likeStatus }, { meta }) => {
            likeStatus.status = 'loading';
            likeStatus.loadId = meta.arg;
        },
        [likePost.fulfilled]: (state, { payload }) => {
            console.log("LIKE FULFILLED")
            state.posts = payload
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
            state.posts = payload
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
            state.bookmarks = payload.bookmarks.reverse();
            state.bookmarkStatus.status = 'success';
        },
        [removeBookmark.rejected]: (state, { payload }) => {
            state.bookmarkStatus.status = 'failed'
        },


        [bookmarkPost.pending]: ({ bookmarkStatus }, { meta }) => {
            bookmarkStatus.status = 'loading';
            bookmarkStatus.loadId = meta.arg;
        },
        [bookmarkPost.fulfilled]: (state, { payload }) => {
            state.bookmarks = payload.bookmarks.reverse();
            state.bookmarkStatus.status = 'success';
        },
        [bookmarkPost.rejected]: ({ bookmarkStatus }, { payload }) => {
            bookmarkStatus.status = 'failed'
        },


        [getAllBookmarks.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getAllBookmarks.fulfilled]: (state, { payload }) => {
            state.posts = payload.reverse()
            state.status = 'success'
        },
        [getAllBookmarks.rejected]: (state, { payload }) => {
            state.status = 'failed'
        },
    }
})

export const { sortPosts, gifSelection } = postsSlice.actions
export default postsSlice.reducer