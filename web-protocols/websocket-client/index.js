// WebSocket protocol provides persistent bidirectional channel rather than a request
// response channel. A message can be pushed from the server without a client asking
// for it.
const WebSocket = require('ws')
const readLine = require('readline')
const ws = new WebSocket(process.argv[2] || 'ws://localhost:8080')
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '-> '
})

// ANSI terminal escape codes
const grey = '\u001b[90m'
const red = '\u001b[31m'
const reset = '\u001b[39m'

// listen for open event in our websocket client instance
// output the appropriate status message when free
ws.on('open', () => {
  // using output rather than process.stdout makes it agnostic to I/o streams.
  // Allows it to be extendable and pluggable
  rl.output.write(`${grey}-- Connected -- ${reset}\n\n`)
  rl.prompt()
})

// Allows any line to take line by line input, it listens for line events and
// sends the user input as a WebSocket message
rl.on('line', (msg) => {
  // if send is successful then second argument is called
  ws.send(msg, () => {
    // Output status message confirming user input was sent and sets up next prompt
    rl.output.write(`${grey}<= ${msg}${reset}\n\n`)
    rl.prompt()
  })
})

// WebSocket communication is bidirectional, so we listen for any messages coming from server
ws.on('message', function (msg) {
  readLine.clearLine(rl.output)
  readLine.moveCursor(rl.output, -3 - rl.line.length, -1)
  rl.output.write(`${grey}=> ${msg}${reset}\n\n`)
  rl.prompt(true)
})

// output relevant status to terminal
ws.on('close', () => {
  readLine.cursorTo(rl.output, 0)
  rl.output.write(`${grey}-- Disconnected --${reset}\n\n`)
  process.ext()
})
ws.on('error', (err) => {
  readLine.cursorTo(rl.output, 0)
  rl.output.write(`${red}-- Error --${reset}\n`)
  rl.output.write(`${red}${err.stack}${reset}\n`)
})
