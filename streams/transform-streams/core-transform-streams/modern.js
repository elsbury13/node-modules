// More functional approach in Node 4
const { Transform } = require('readable-stream')

// doesnt require new invocation so we can call it as a function
// This does limit to Node 4 and above
const upper = Transform({
  transform: (chunk, enc, cb) => {
    cb(null, chunk.toString().toUpperCase())
  }
})

process.stdin.pipe(upper).pipe(process.stdout)
