import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { activeCardReducer } from './activeCard/activeCardSlice'
import { notificationsReducer } from './notification/notificationsSlice'

const rootPersistConfig = {
  key: 'root',//key default is root
  storage: storage,//save to local storage
  whiteList: ['user']//Định nghĩa các slice khi f5 ĐƯỢC PHÉP vẫn lưu giữ 
  //, blacklist: ['user']//Định nghĩa các slice khi f5 KO ĐƯỢC PHÉP vẫn lưu giữ
}

const rootReducer = combineReducers({
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer,
  user: userReducer,
  notifications: notificationsReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})