const express = require('express')
const he = require('he')
const app = express()
const escapeHtml = require('escape-html')

// Our server is emulating a scenario where one page is
// handing over some minimal state to another via GET parameters.
app.get('/', (req, res) => {
  const { prev = '', handoverToken = '', lang = 'en' } = req.query
  pretendDbQuery((err, status) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    const href = escapeHtml(`/${prev}${handoverToken}/${lang}`)
    res.send(`
      <h1>Current Status</h1>
      <div id=stat>
        ${he.escape(status)}
      </div>
      <br />
      <a href="${href}"> Back to Control HQ </a>
    `)
  })
})

function pretendDbQuery (cb) {
  const status = 'ON FIRE!!! HELP!!!'
  cb(null, status)
}

app.listen(3000)
