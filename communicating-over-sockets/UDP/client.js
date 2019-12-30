const dgram = require('dgram')

const socket = dgram.createSocket('udp4')
const name = process.argv[2] || 'Andy'

// port 1400
socket.bind(1400)
socket.send(name, 1338)

// listen for message as data is stream
socket.on('message', (data) => {
  console.log(data.toString())
})
