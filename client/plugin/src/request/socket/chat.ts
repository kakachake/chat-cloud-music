import { setRoomId } from '@/store/slice/roomSlice'
import { Socket } from 'socket.io-client'
import { manager } from '.'
import { store } from '../../store'

const user = store.getState().user.user

const roomManager: Socket = manager.socket('/room')
const listenCbs: ((data: any) => void)[] = []
export const listenChat = (cb: (data: any) => void) => {
  listenCbs.push(cb)
  return () => {
    const index = listenCbs.indexOf(cb)
    if (index > -1) {
      listenCbs.splice(index, 1)
    }
  }
}

export const createRoom = (roomId: number) => {
  return new Promise((resolve, reject) => {
    roomManager.emit('createRoom', { roomId })
    roomManager.on('createRoom', (data) => {
      const { roomId } = data
      resolve(roomId)
    })
  })
}

roomManager.on('chatSocket', (data: any) => {
  console.log(data)
  listenCbs.forEach((cb) => {
    cb(data)
  })
})

roomManager.on('leaveRoom', (data: any) => {
  store.dispatch(setRoomId(null))
})

export const sendMsg = (msg: string) => {
  roomManager?.emit('chatSocket', {
    msg,
    // roomId,
    user
  })
}

export const leaveRoom = (roomId: number) => {
  roomManager.emit('leaveRoom', { roomId })
}
