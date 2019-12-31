// If we are not returning serializable data we need to make it object mode
// Generic objects and only difference is how much data is buffered
// It will start pausing when 16 objects have been buffered
const through = require('through2')
const { serialize } = require('ndjson')

// Receives and responds with objects rather than chunks
const xyz = through.obj(({ x, y }, enc, cb) => {
  cb(null, { z: x + y })
})

// converts objects to newline delimited JSON.
// Objects go ina dn buffers come out
xyz.pipe(serialize()).pipe(process.stdout)
xyz.write({ x: 199, y: 3 })
xyz.write({ x: 10, y: 12 })
