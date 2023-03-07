import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import withRoom from './room'
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const cors = require('cors')
app.use(cors())
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

io.on('connection', (client) => {
  console.log('connect')
})

io.on('error', (err) => {
  console.log('Caught flash policy server socket error: ')
  console.log(err.stack)
})
withRoom(io)
server.listen(4000, () => {
  console.log('listening on *:4000')
})
