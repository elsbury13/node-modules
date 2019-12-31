// keeping pipe streams alive
// Allowing additional writes to a stream when source stream is complete
const net = require('net')
const fs = require('fs')

net.createServer((socket) => {
  const content = fs.createReadStream(__filename)
  content.pipe(socket, { end: false })
  content.on('end', () => {
    socket.end('\n======== Footer =======\n')
  })
}).listen(3000)
