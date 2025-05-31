import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartCount: 0,
        deviceCount: 0,
        bandCount: 0,
        appearanceCount: 0,
        items: [],
    },
    reducers: {
        increment: (state, action) => {
            console.log("action.payload", action.payload);
            state.cartCount += action.payload?.count || 0;
            state[`${action.payload?.type}Count`] += action.payload.count || 0;
            
            if (action.payload?.id) {
                const existingItem = state.items.find(item => item.id === action.payload.id);
                
                if (existingItem) {
                    existingItem.quantity += action.payload.count || 1;
                } else {
                    state.items.push({
                        id: action.payload.id,
                        type: action.payload.type,
                        quantity: action.payload.count || 1,
                        price: action.payload.price || 0
                    });
                }
            }
        },
        removeItem: (state, action) => {
            const itemToRemove = state.items.find(item => item.id === action.payload.id);
            if (itemToRemove) {
                state.cartCount -= itemToRemove.quantity;
                state[`${itemToRemove.type}Count`] -= itemToRemove.quantity;
                state.items = state.items.filter(item => item.id !== action.payload.id);
            }
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                const diff = action.payload.quantity - item.quantity;
                state.cartCount += diff;
                state[`${item.type}Count`] += diff;
                item.quantity = action.payload.quantity;
            }
        },
        reset: (state) => {
            state.cartCount = 0;
            state.deviceCount = 0;
            state.bandCount = 0;
            state.appearanceCount = 0;
            state.items = [];
        },
        decrement: (state, action) => {
            const { id, type } = action.payload;
            const existingItem = state.items.find(item => item.id === id && item.type === type);
            
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(item => !(item.id === id && item.type === type));
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});


/*const loginSlice = createSlice({
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
    }
});
*/

// Export actions
//export const { login, logout } = loginSlice.actions;

// Export reducer
//export const loginReducer = loginSlice.reducer;


// ✅ 正確 export actions
export const { increment, removeItem, updateQuantity, reset, decrement, clearCart } = cartSlice.actions;

// ✅ 正確 export reducer
export default cartSlice.reducer;
