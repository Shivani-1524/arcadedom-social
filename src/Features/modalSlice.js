import { createSlice, current } from "@reduxjs/toolkit";


const namespace = 'modal'
const initialStateValue = { display: false, type: 'default', userList: null }

export const modalSlice = createSlice({
    name: namespace,
    initialState: { value: initialStateValue },
    reducers: {
        showModal: (state, action) => {
            state.value.type = action.payload.type;
            state.value.userList = action.payload.list;
            state.value.display = true;
        },
        hideModal: (state) => {
            state.value = initialStateValue
        }
    }
})

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;