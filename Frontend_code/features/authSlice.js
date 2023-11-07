import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
//     user: null,
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: '',
//     isLoggedIn: false
// }

//reducer
// reset: (state) => {
//     state.isError = false;
//     state.isSuccess = false;
//     state.isLoading = false;
//     state.message = '';
//     state.isLoggedIn = !state.isLoggedIn;
// }

const initialState = {
    user: null,
    isLoggedIn: false,
    isDoctor: false
}

//creating authentication reducer to manage login status and logged in user data globally

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            state.isDoctor = false
        },
        setDoctor(state) {
            state.isDoctor = true
        }
    },
    extraReducers: () => {}
});

// export const { authActions } = authSlice.actions;
export default authSlice;