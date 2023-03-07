import { Manager } from 'socket.io-client'
import { createRoom } from './chat'
export const manager = new Manager('http://192.168.0.4:4000', {})

export const socket = manager.socket('/') // main namespace
