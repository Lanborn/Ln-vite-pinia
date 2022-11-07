import SocketIO from 'socket.io-client'

export const socket = SocketIO('http://localhost:8080', {
  transports: ['websocket'],
  path: '/ws',
  reconnection: true,
  reconnectionAttempts: Infinity,
  autoConnect: false,
})
