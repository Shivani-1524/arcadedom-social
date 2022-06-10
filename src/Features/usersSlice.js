import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios'

const namespace = 'user'


export const getUserPosts = createAsyncThunk(`/${namespace}/getUserPosts`, async ({ username }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/posts/user/${username}`)
        console.log(data)
        return data.posts
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const getUserData = createAsyncThunk(`/${namespace}/getUserData`, async ({ username }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/users/${username}`)
        console.log(data)
        return data.user
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const editUserData = createAsyncThunk(`/${namespace}/getUserData`, async ({ userData }, { rejectWithValue }) => {
    console.log('User Data: ', { userData })
    try {
        const { data } = await axios.post(`/api/users/edit`, { userData })
        console.log(data)
        return data.user
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const getAllUsers = createAsyncThunk(`/${namespace}/getAllUsers`, async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/api/users`)
        console.log(data)
        return data.users
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const followUser = createAsyncThunk(`/${namespace}/followUser`, async ({ followUserId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`/api/users/follow/${followUserId}`)
        console.log(data)
        return data.followUser
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})
export const unfollowUser = createAsyncThunk(`/${namespace}/unfollowUser`, async ({ followUserId }, { rejectWithValue }) => {
    console.log({ followUserId })
    try {
        const { data } = await axios.post(`/api/users/unfollow/${followUserId}`)
        console.log(data)
        return data.followUser
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})




const initialStateValue = {
    userPosts: [],
    userData: null,
    allUsers: { status: "idle", list: [] },
    status: null,
}

export const usersSlice = createSlice({
    name: namespace,
    initialState: { value: initialStateValue },
    // reducers: {
    //     showModal: (state, action) => {
    //         state.value.type = action.payload.type;
    //         state.value.display = true;
    //     },
    //     hideModal: (state) => {
    //         state.value = initialStateValue
    //     }
    // },
    extraReducers: {
        [getUserPosts.pending]: (state) => {
            state.value.status = 'loading'
        },
        [getUserPosts.fulfilled]: (state, { payload }) => {
            state.value.userPosts = payload
            state.value.status = 'success'
        },
        [getUserPosts.rejected]: (state, { payload }) => {
            state.value.status = 'failed'
            console.log(payload)
        },
        [getUserData.pending]: (state) => {
            state.value.status = 'loading'
        },
        [getUserData.fulfilled]: (state, { payload }) => {
            state.value.userData = payload
            state.value.status = 'success'
        },
        [getUserData.rejected]: (state, { payload }) => {
            state.value.status = 'failed'
            console.log(payload)
        },
        [editUserData.pending]: (state) => {
            state.value.status = 'loading'
        },
        [editUserData.fulfilled]: (state, { payload }) => {
            state.value.userData = payload
            state.value.status = 'success'
        },
        [editUserData.rejected]: (state, { payload }) => {
            state.value.status = 'failed'
            console.log(payload)
        },
        [getAllUsers.pending]: (state) => {
            state.value.allUsers.status = 'loading'
        },
        [getAllUsers.fulfilled]: (state, { payload }) => {
            state.value.allUsers.list = payload
            state.value.allUsers.status = 'success'
        },
        [getAllUsers.rejected]: (state, { payload }) => {
            state.value.allUsers.status = 'failed'
        },
        [followUser.pending]: (state) => {
            state.value.status = 'loading'
        },
        [followUser.fulfilled]: (state, { payload }) => {
            state.value.userData = payload
            state.value.status = 'success'
        },
        [followUser.rejected]: (state, { payload }) => {
            state.value.status = 'failed'
            console.log(payload)
        },
        [unfollowUser.pending]: (state) => {
            state.value.status = 'loading'
        },
        [unfollowUser.fulfilled]: (state, { payload }) => {
            state.value.userData = payload
            state.value.status = 'success'
        },
        [unfollowUser.rejected]: (state, { payload }) => {
            state.value.status = 'failed'
            console.log(payload)
        },
    }
})

export const { showModal, hideModal } = usersSlice.actions;

export default usersSlice.reducer;