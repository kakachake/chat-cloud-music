import { Server } from 'socket.io'

export default function withRoom(io: Server) {
  const chat = io.of('/room')

  chat.on('connection', (socket) => {
    console.log('chat connected')

    socket.on('createRoom', (data: any) => {
      const { roomId } = data
      socket.join(roomId)
      console.log(socket.rooms)

      socket.emit('createRoom', { roomId })
    })

    socket.on('chatSocket', (data: any) => {
      const { msg, user } = data
      const rooms = socket.rooms
      console.log(socket.rooms)
      for (const room of rooms) {
        if (room !== socket.id) {
          console.log('chat to room: ' + room)
          socket.to(room).emit('chatSocket', { msg, user })
        }
      }
    })
    socket.on('leaveRoom', (data) => {
      const { roomId } = data
      socket.leave(roomId)
      console.log(socket.rooms)

      socket.emit('leaveRoom', { roomId })
    })
  })
}
