// Take gzipped tarball of first node, change all file paths as well as
// changing username and modified time of each file

const zlib = require('zlib')
const map = require('tar-map-stream')

const decompress = zlib.createGunzip()
const whoami = process.env.USER || process.env.USERNAME

const convert = map((header) => {
  header.uname = whoami
  header.mtime = new Date()
  header.name = header.name.replace('node-v0.1.100', 'edon-v0.0.0')

  return header
})
const compress = zlib.createGzip()

// attaches a data event listener to source stream.
// We are essentially instructing node to shuffle data through multiple streams
process.stdin
  .pipe(decompress)
  // incrementally parses the tar archive, calling every time heard is encountered
  .pipe(convert)
  // incrementally gzips our new tar archive and passes data to process.stdout
  .pipe(compress)
  .pipe(process.stdout)
