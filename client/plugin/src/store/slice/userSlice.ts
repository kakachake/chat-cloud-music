import { createSlice } from '@reduxjs/toolkit'
import { User } from 'chatTypes'
import mockUser from '../../../../../mock/mockUser'
interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: mockUser()
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
