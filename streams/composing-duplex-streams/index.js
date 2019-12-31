const from = require('from2')
const to = require('to2')
const duplexify = require('duplexify')

const rs = from(() => {
  rs.push(Buffer.from('Hello world!'))
  rs.push(null)
})

const ws = to((data, enc, cb) => {
  console.log(`Data written: ${data.toString()}`)
  cb()
})

const stream = duplexify(ws, rs)

// instead of piping rs to ws we can pipe to stream itself
// can be useful to export multiple streams that are not related
stream.pipe(stream)
