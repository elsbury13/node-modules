module.exports = writing

const net = require('net')
const nos = require('net-object-stream')
const through = require('through2')
const pump = require('pump')
const bloomrun = require('bloomrun')

const {
  ADDERSERVICE_SERVICE_HOST,
  ADDERSERVICE_SERVICE_PORT
} = process.env

function writing (service) {
  const patterns = createPatternRoutes(service)
  const matcher = createMatcherStream(patterns)

  const server = net.createServer((socket) => {
    socket = nos(socket)
    pump(socket, matcher, socket, failure)
  })

  // take the port assignment from an environment variable
  server.listen(ADDERSERVICE_SERVICE_PORT, '0.0.0.0', () => {
    console.log('server is listening at ', ADDERSERVICE_SERVICE_PORT)
  })
}

function createPatternRoutes(service) {
  const patterns = bloomrun()

  patterns.add({role: 'adder', cmd: 'add' }, service.add)

  return patterns
}

function createMatcherStream(patterns) {
  return through.obj((object, enc, cb) => {
    if (match == null) {
      cb()
      return
    }
    match(object, (err, data) => {
      if (err) {
        cb(null, { status: 'error', err: err })
        return
      }
      cb(null, data)
    })
  })
}

function failure(err) {
  if (err) {
    console.log('Server error', err)
  } else {
    console.error('Stream pipeline ended')
  }
}
