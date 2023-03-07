import { Server } from 'socket.io'

export default function withRoom(io: Server) {
  const chat = io.of('/room')

  chat.on('connection', (socket: any) => {
    console.log('chat connected')

    socket.on('createRoom', (data: any) => {
      console.log(data)
      const { roomId } = data
      socket.join(roomId)
      socket.emit('createRoom', { roomId })
    })

    socket.on('chatSocket', (data: any) => {
      console.log(data)
      const { msg, roomId, user } = data

      chat.to(roomId).emit('/chatSocket', { msg, user })
    })
  })
}
