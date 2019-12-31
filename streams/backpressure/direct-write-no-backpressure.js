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

// now see stream buffer grow to 330KB  before falling back to 16KB
// as stream attempts to free up buffer
rs.on('data', (chunk) => ws.write(chunk))
