const net = require('net')

// Initiate a TCP server
// Returns an object with listener.
// This is passed to connection handler function which is called every time new
// connection is established
net.createServer((socket) => {
  console.log('-> client connected')
  socket.on('data', name => {
    socket.write(`Hi ${name}`)
  })
  socket.on('close', () => {
    console.log('-> client disconnected')
  })
}).listen('/tmp/my.socket')

// one line
// require('net').createServer((socket) => socket.pipe(socket)).listen('/tmp/my.socket')
