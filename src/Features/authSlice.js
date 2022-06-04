import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const namespace = 'auth'

export const loginUser = createAsyncThunk(`/${namespace}/loginUser`, async (loginData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("/api/auth/login", { ...loginData });
        return data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const signupUser = createAsyncThunk(`/${namespace}/signupUser`, async (signupData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post("/api/auth/signup", { ...signupData });
        return data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

const initialStateValue = {
    authToken: localStorage.getItem('arcadedomToken'),
    currentUser: localStorage.getItem('arcadedomUser'),
    status: null,
    authError: null,
}

export const authSlice = createSlice({
    name: namespace,
    initialState: initialStateValue,
    reducers: {
        userLogout: (state) => {
            localStorage.removeItem('arcadedomToken');
            localStorage.removeItem('arcadedomUser');
            state.authToken = null;
            state.currentUser = null;
        }
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.status = 'loading';
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            state.authToken = payload.encodedToken;
            state.currentUser = JSON.stringify(payload.foundUser);
            localStorage.setItem('arcadedomToken', payload.encodedToken);
            localStorage.setItem('arcadedomUser', JSON.stringify(payload.foundUser));
            state.status = 'success';
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.status = 'failed';
            state.authError = payload.errors;
        },

        [signupUser.pending]: (state) => {
            state.status = 'loading';
        },
        [signupUser.fulfilled]: (state, { payload }) => {
            state.authToken = payload.encodedToken;
            state.currentUser = JSON.stringify(payload.createdUser);
            localStorage.setItem('arcadedomToken', payload.encodedToken);
            localStorage.setItem('arcadedomUser', JSON.stringify(payload.createdUser));
            state.status = 'success';
        },
        [signupUser.rejected]: (state, { payload }) => {
            state.status = 'failed';
            state.authError = payload.errors;
        }
    }
})

export const { userLogout } = authSlice.actions
export default authSlice.reducer