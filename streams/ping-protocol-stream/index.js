// uses through2 to create a stream that expects data chunks as separate lines
// We check to see if it matches protocol and respond if it does, if not then
// not implemented is returned
const through = require('through2')
// use split2 to ensure data is split line by line
const split = require('split2')
// use pumpify to create single pipeline duplex stream
const pumpify = require('pumpify')

// Now we will write a pingProtocol function and export it
function pingProtocol () {
  const ping = /Ping:\s+(.*)/
  const protocol = through(each)

  function each (line, enc, cb) {
    if (ping.test(line)) {
      cb(null, `Pong: ${line.toString().match(ping)[1]}\n`)
      return
    }
    cb(null, 'Not Implemented')
  }

  return pumpify(split(), protocol)
}

module.exports = pingProtocol
