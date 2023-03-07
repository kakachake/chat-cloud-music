import { Socket } from 'socket.io-client'
import { manager, socket } from '.'
import { v4 as uuidv4 } from 'uuid'

export const user = {
  id: uuidv4(),
  name: 'test',
  avatar:
    'http://p2.music.126.net/hu5fA12xFpK9_6G27Kmbpw==/109951165136954444.jpg'
}
const roomId = 1
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

createRoom(roomId).then(() => {
  roomManager.on('/chatSocket', (data: any) => {
    listenCbs.forEach((cb) => {
      cb(data)
    })
  })
})

export const sendMsg = (msg: string) => {
  roomManager?.emit('chatSocket', {
    msg,
    roomId,
    user
  })
}
