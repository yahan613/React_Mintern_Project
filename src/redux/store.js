// store.js
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // 使用 localStorage 作為儲存位置
import cartReducer from './cartSlice'

import { combineReducers } from 'redux'

// 把所有 reducer 組合起來（目前只有一個）
const rootReducer = combineReducers({
  cart: cartReducer,
})

// persist 設定
const persistConfig = {
  key: 'root',     // 存到 localStorage 的 key 名稱
  storage,         // 使用 localStorage
}

// 包裝 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// configureStore
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 關閉警告（因為 redux-persist 用了一些非序列化的內容）
    }),
})

export const persistor = persistStore(store)
export default store
