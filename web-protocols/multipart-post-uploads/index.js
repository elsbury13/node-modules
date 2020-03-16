const http = require('http')
const fs = require('fs')
const path = require('path')
const steed = require('steed')()

// determine which files to send in multipart data.
const files = process.argv.slice(2)
const boundary = Date.now()
const opts = {
  method: 'POST',
  hostname: 'localhost',
  port: 8080,
  path: '/',
  headers: {
    'Content-Type': 'multipart/form-data; boundary="' + boundary + '"',
    'Transfer-Encoding': 'chunked'
  }
}

// Setting up request
const req = http.request(opts, (res) => {
  console.log('\n Status: ' + res.statusCode)
  process.stdout.write(' Body: ')
  res.pipe(process.stdout)
  res.on('end', () => console.log('\n'))
})

const parts = files.map((file, i) => (cb) => {
  // read stream with file path
  const stream = fs.createReadStream(file)
  stream.once('open', () => {
    // Each open stream we add a multipart header
    // Since data can be binary, we send it all like that to keep it simple
    req.write(
      `\r\n--${boundary}\r\n` +
      'Content-Disposition: ' +
      `form-data; name="userfile${i}";` +
      `filename="${path.basename(file)}"\r\n` +
      'Content-Type: application/octet-stream\r\n' +
      'Content-Transfer-Encoding: binary\r\n' +
      '\r\n'
    )
  })
  // false will prevent req from being closed when stream finishes. As there maybe more files
  stream.pipe(req, { end: false })
  stream.on('end', cb)
})

steed.series(parts, () => req.end(`\r\n--${boundary}--\r\n`))
