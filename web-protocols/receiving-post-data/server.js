const http = require('http')
const fs = require('fs')
const path = require('path')
const form = fs.readFileSync(path.join(__dirname, 'public', 'form.html'))
const qs = require('querystring')
const maxData = 2 * 1024 * 1024 // 2MB - guard against DOS attacks
const parse = require('fast-json-parse')

// Object is returned which represents http server.
// Call listen on server 8080
http.createServer((req, res) => {
  if (req.method === 'GET') {
    get(res)
    return
  }
  if (req.method === 'POST') {
    post(req, res)
    return
  }
  reject(405, 'Method Not Allowed', res)
}).listen(8080)

function get (res) {
  res.writeHead(200, { 'Content-type': 'text/html' })
  res.end(form)
}

function post (req, res) {
  // if (req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
  if (req.headers['content-type'] !== 'application/json') {
    reject(415, 'Unsupported Media Type', res)
    return
  }

  const size = parseInt(req.headers['content-length'], 10)
  if (isNaN(size)) {
    console.log(size)
    reject(400, 'Bad request', res)
    return
  }
  if (size > maxData) {
    reject(413, 'Too Large', res)
    return
  }

  // creates a buffer from deallocated memory.
  // By using this we accept the burden of ensuring malicious request cant leak data.
  const buffer = Buffer.allocUnsafe(size)
  var pos = 0

  req
    .on('data', (chunk) => {
      const offset = pos + chunk.length
      if (offset > size) {
        reject(413, 'Too large', res)
        return
      }
      // duplicate the bytes in each incoming chunk
      chunk.copy(buffer, pos)
      pos = offset
    })
    .on('end', () => {
      // need to check otherwise internal memory could leak to client
      if (pos !== size) {
        reject(400, 'Bad request', res)
        return
      }
      // converts post data into an object
      // const data = qs.parse(buffer.toString())
      const data = buffer.toString()
      const parsed = parse(data)
      if (parsed.err) {
        reject(400, 'Bad request', res)
        return
      }
      // console.log('User Posted: ', data)
      // res.end('You posted: ' + JSON.stringify(data))
      console.log('User Posted: ', parsed.value)
      res.end('{"data": ' + data + '"}"')
    })
}

function reject (code, msg, res) {
  res.statusCode = code
  res.end(msg)
}
