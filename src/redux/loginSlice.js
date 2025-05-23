// ✅ loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        setUserName: (state, action) => {
            state.name = action.payload;
        },
    },
});

export const { login, logout, setUserName } = loginSlice.actions;

export default loginSlice.reducer;

