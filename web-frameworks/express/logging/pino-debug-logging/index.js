const { join } = require('path')
const express = require('express')
const pino = require('pino')()
const logger = require('express-pino-logger')({
  instance: pino
})
const index = require('./routes/index')

/*
const http = require('http')
http.createServer((req, res) => {
  add extra methods and properties to req and res
}))
*/
const app = express()

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

// Setting namespace of views to correct folder. Although Express will
// default to views location
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

// When we register logger in app.js the express-pino-logger middleware
// function adds a log object to every incoming request (as req.log).
app.use(logger)

// Register express middleware
/*
const http = require('http')
http.createServer((req, res) => {
  call the middleware registered with app.use
  wait for each piece of middleware to finish
  before calling the next (wait for the next cb)
}))
*/
if (dev) {
  app.use(express.static(join(__dirname, 'public')))
}

// mount index at route path
app.use('/', index)

// Which port to listen to
app.listen(port, () => {
  // writes a JSON log message
  pino.info(`Server listening on port ${port}`)
})
