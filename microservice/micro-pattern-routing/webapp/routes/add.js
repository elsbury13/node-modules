const { Router } = require('express')
const restify = require('restify-clients')
const net = require('net')
const nos = require('net-object-stream')
const router = Router()

const {
  ADDERSERVICE_SERVICE_HOST,
  ADDERSERVICE_SERVICE_PORT
} = process.env

router.get('/', function (req, res) {
  res.render('add', { first: 0, second: 0, result: 0 })
})

router.post('/calculate', function (req, res, next) {
  const client = createClient('calculate', {
    host: ADDERSERVICE_SERVICE_HOST,
    port: ADDERSERVICE_SERVICE_PORT
  })

  const role = 'adder'
  const cmd = 'add'

  const { first, second } = req.body
  client.once('data', (data) => {
    const { result } = data
    res.render('add', { first, second, result })
  })
  client.write({ role, cmd, first, second })
})

// creates and caches a TCP client wrapped in a net-object-stream interface
function createClient (ns, opts) {
  return createClient[ns] || (createClient[ns] = nos(net.connect(opts)))
}

module.exports = router
