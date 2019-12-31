// provides a thin layer over core streams transform constructor
// through2 is less noisy, easier to read and uses readable-stream
const through = require('through2')

const upper = through((chunk, enc, cb) => {
  cb(null, chunk.toString().toUpperCase())
})

process.stdin.pipe(upper).pipe(process.stdout)
