import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        userName: null,
        userMail: null,
        userId: null,
        userChickenBaby: null,
    },
    reducers: {
        signup: (state, action) => {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.userMail = action.payload.email;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userName = action.payload.userName;
            state.userMail = action.payload.email;
            state.userId = action.payload.userId;
            state.userChickenBaby = action.payload.userChickenBaby;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userName = null;
            state.userMail = null;
            state.userId = null;
            state.userChickenBaby = null;
        },
        setData: (state, action) => {
            state.userName = action.payload.userName;
            state.userChickenBaby = action.payload.userChickenBaby;
        }
    },
});

export const { login, logout, setData, signup } = loginSlice.actions;

export default loginSlice.reducer;