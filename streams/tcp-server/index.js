const net = require('net')
const pump = require('pump')
// require, call function to create stream and pipe form incoming socket
// through the protocol stream back to the socket
const ping = require('../ping-protocol-stream')

const server = net.createServer((socket) => {
  const protocol = ping()
  pump(socket, protocol, socket, closed)
})

function closed (err) {
  if (err) {
    console.error('connection closed with error', err)
  }

  console.log('connection closed')
}
