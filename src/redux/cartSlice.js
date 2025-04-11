import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartCount: 0,
        deviceCount: 0,
        bandCount: 0,
        appearanceCount: 0,
    },
    reducers: {
        increment: (state, action) => {
            console.log("action.payload", action.payload);
            state.cartCount += action.payload?.count || 0;
            state[`${action.payload?.type}Count`] += action.payload.count || 0;
        },
        reset: (state) => {
            state.cartCount = 0;
            state.deviceCount = 0;
            state.bandCount = 0;
            state.appearanceCount = 0;
        }
    }
});

// ✅ 正確 export actions
export const { increment, reset } = cartSlice.actions;

// ✅ 正確 export reducer
export default cartSlice.reducer;
