const net = require('net')

const socket = net.connect('/tmp/my.socket')
const name = process.argv[2] || 'Andy'

socket.write(name)

socket.on('data', (data) => {
  console.log(data.toString())
})

// socket.pipe(process.stdout)

socket.on('close', () => {
  console.log('-> disconnected by server')
})

// One line
// process.stdin.pipe(require('net').connect('/tmp/my.socket')).pipe(process.sdtout)
