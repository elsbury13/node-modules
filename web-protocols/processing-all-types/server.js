// NOT CURRENTLY WORKING
const http = require('http')
const fs = require('fs')
const path = require('path')
// thin wrapper around busboy module. Listens to busboy for a file event
// and calls user supplied function (e.g. part function)
const mrs = require('multipart-read-stream')
const pump = require('pump')
const form = fs.readFileSync(path.join(__dirname, 'public', 'form.html'))

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
  if (!/multipart\/form-data/.test(req.headers['content-type'])) {
    reject(415, 'Unsupported Media Type', res)
    return
  }
  console.log('parsing multipart data')
  const parser = mrs(req, res, part, () => {
    console.log('finished parsing')
  })

  parser.on('field', (field, value) => {
    console.log(`${field}: ${value}`)
    res.write(`processed "${field}" input.\n`)
  })
  // track files from their point of discovery to when written to disk
  var total = 0
  // pipe data from req to parser
  pump(req, parser)

  // called each time parser stream encounters a multipart boundry that contains a file
  function part (field, file, name) {
    // check name is not non falsey
    if (!name) {
      // if empty file section, run file to completion. Allowing process of next multipart data
      file.resume()
      return
    }
    total += 1
    const filename = `${field}-${Date.now()}-${name}`
    const dest = fs.createWriteStream(path.join(__dirname, 'uploads', filename))
    pump(file, dest, (err) => {
      total -= 1
      res.write(err
        ? `Error saving ${name}!\n`
        : `${name} successfully saved!\n`
      )
      if (total === 0) {
        res.end('All files Processed')
      }
    })
  }
}

function reject (code, msg, res) {
  res.statusCode = code
  res.end(msg)
}
