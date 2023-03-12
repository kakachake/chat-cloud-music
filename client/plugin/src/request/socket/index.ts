import { Manager } from 'socket.io-client'
import { createRoom } from './chat'
import http from 'http'

export const manager = new Manager('http://192.168.1.106:4000', {})

export const socket = manager.socket('/') // main namespace
