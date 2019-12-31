// use readable-stream so we are consistent across node versions
// Best approach for publishing public modules to npm
const stream = require('readable-stream')
const util = require('util')

function MyTransform (opts) {
  stream.Transform.call(this, opts)
}

util.inherits(MyTransform, stream.Transform)

MyTransform.prototype._transform = function (chunk, enc, cb) {
  cb(null, chunk.toString().toUpperCase())
}

const upper = new MyTransform()

process.stdin.pipe(upper).pipe(process.stdout)
