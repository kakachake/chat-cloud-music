import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slice/userSlice'
import roomReducer from './slice/roomSlice'

export const store = configureStore({
  reducer: {
    user: usersReducer,
    room: roomReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
