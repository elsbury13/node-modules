const http = require('http')
const fs = require('fs')
const path = require('path')
const pump = require('pump')
const through = require('through2')
const form = fs.readFileSync('public/form.html')
const maxFileSize = 51200

// Object is returned which represents http server.
// Call listen on server 8080
http.createServer((req, res) => {
  if (req.method === 'GET') {
    get(res)
    return
  }
  if (req.method === 'PUT') {
    put(req, res)
    return
  }
  reject(405, 'Method Not Allowed', res)
}).listen(8080)

function get (res) {
  res.writeHead(200, { 'Content-type': 'text/html' })
  res.end(form)
}

function put (req, res) {
  const size = parseInt(req.headers['content-length'], 10)
  if (isNaN(size)) {
    reject(400, 'Bad Request', res)
    return
  }
  if (size > maxFileSize) {
    reject(413, 'Too Large', res)
    return
  }

  // get original filenames
  const name = req.headers['x-filename']
  const field = req.headers['x-field']
  const filename = `${field}-${Date.now()}-${name}`
  const dest = fs.createWriteStream(path.join(__dirname, 'uploads', filename))
  // for safety use through to create a byte counting stream
  // if total bytes exceed the max then we send error messages
  const counter = through(function (chunk, enc, cb) {
    this.bytes += chunk.length
    if (this.bytes > maxFileSize) {
      cb(Error('size'))
      return
    }
    cb(null, chunk)
  })
  counter.bytes = 0
  counter.on('error', (err) => {
    if (err.message === 'szie') {
      reject(413, 'Too Large', res)
    }
  })
  pump(req, counter, dest, (err) => {
    if (err) {
      return reject(500, `Error Saving ${name}!\n`, res)
    }
    res.end(`${name} successfully saved\n`)
  })
}

function reject (code, msg, res) {
  res.statusCode = code
  res.end(msg)
}
