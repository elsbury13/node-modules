var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
/* a collection of Express middleware, that provides some sane security defaults when included
  X-DNS-Prefetch-Control: off -- not to prefetch DNS records for references within an HTML page
  X-Frame-Options: SAMEORIGIN -- prevents iframe based Click Jacking where our site may be loaded in an <iframe> HTML element on a malicious site
  X-Download-Options: noopen -- archaic throwback that attempts to protect what remains of the Internet Explorer 8 user base
  X-Content-Type-Options: nosniff -- instructs the browser to never guess and override the MIME type
  X-XSS-Protection: 1; mode=block -- instructs the Internet Explorer to refuse to render when it detects a Reflected XSS attack
  Strict-Transport-Security: max-age=15552000; includeSubDomains -- which is only enabled for HTTPS requests, every subsequent visit must use HTTPS
*/
var helmet = require('helmet')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var createError = require('http-errors')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
