const { join } = require('path')
const express = require('express')
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
  console.log(`Server listening on port ${port}`)
})

// Setting namespace of views to correct folder. Although Express will
// default to views location
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
