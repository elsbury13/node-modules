// Stream that takes 1ms to process each chunk and a read stream that
// pushes 16KB chunks
const { Readable, Writable } = require('readable-stream')

var i = 20

const rs = Readable({
  read: (size) => {
    // simulate asynchronous behaviour
    setImmediate(function () {
      rs.push(i-- ? Buffer.alloc(size) : null)
    })
  }
})

const ws = Writable({
  write: (chunk, enc, cb) => {
    // logging size of stream
    console.log(ws._writableState.length)
    setTimeout(cb, 1)
  }
})

// We check return value of ws.write top determine if stream is still writable
// if not we than pause the incoming readable stream.
// we now see our buffer not exceed 16KB
rs.on('data', (chunk) => {
  const writable = ws.write(chunk)
  if (writable === false) {
    rs.pause()
    ws.once('drain', () => rs.resume())
  }
})
