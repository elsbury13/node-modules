const dgram = require('dgram')

const socket = dgram.createSocket('udp4')
socket.bind(1338)

socket.on('message', (name) => {
  // UDP are not streams so cant use write
  socket.send(`Hi ${name}!`, 1400)
})
