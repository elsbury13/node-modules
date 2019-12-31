const fs = require('fs')
const http = require('http')
const pump = require('pump')

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream('big.file')
  // Handle close but not with pump
  /*
  stream.pipe(res)
  res.on('close', () => {
    stream.destroy()
  })
  */
  pump(stream, res, done)
})

function done (err) {
  if (err) {
    return console.error('File was not fully streamed to the user', err)
  }
  console.log('File was fully streamed to the user')
}

server.listen(3000)
