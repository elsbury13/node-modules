const bodyParser = require('body-parser')
const { join } = require('path')
const express = require('express')
const index = require('./routes/index')

const app = express()
const dev = process.env.NODE_ENV !== 'production'
// set extended to false because the qs module which provides the parsing
// functionality for bodyParse.urlencoded has options which could (without
// explicit validation) allow for a Denial of Service attack
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 3000

if (dev) {
  // register middleware
  app.use(express.static(join(__dirname, 'public')))
}

// register middleware
app.use('/', index)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
