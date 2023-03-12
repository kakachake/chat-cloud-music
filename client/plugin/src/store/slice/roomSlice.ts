import { createSlice } from '@reduxjs/toolkit'
interface RoomState {
  roomInfo: {
    roomId: number | null
  }
}

const initialState: RoomState = {
  roomInfo: {
    roomId: null
  }
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomInfo.roomId = action.payload
    }
  }
})

export const { setRoomId } = roomSlice.actions

export default roomSlice.reducer
