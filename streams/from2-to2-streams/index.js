// wraps the stream.readable module base constructor.
// Can also use extra functions like destroy which frees up resources
// and asynchronous pushing
const from = require('from2')
// alias for flush-write-stream module. Also has destroy like from2 and
// ability to supply flush function which supplies final write to stream before
// finishing
const to = require('to2')

const rs = from(() => {
  rs.push(Buffer.from('Hello, World!'))
  rs.push(null)
})

// attach data listener to the stream or pipe to the writable stream
/*
rs.on('data', (data) => {
  console.log(data.toString())
})
*/

// attach data listener to the stream or pipe to the writable stream
const ws = to((data, enc, cb) => {
  console.log(`Data written: ${data.toString()}`)
  cb()
})

// data inside pipe is emitted as a data event which causes a write to our stream
// It writes out Hello world and indicates to cb its ready for next bit of data
// the null push in rs indicates that is has finished and end of stream
rs.pipe(ws)
