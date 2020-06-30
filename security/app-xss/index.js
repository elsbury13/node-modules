const express = require('express')
const app = express()

// Our server is emulating a scenario where one page is
// handing over some minimal state to another via GET parameters.
app.get('/', (req, res) => {
  const { prev = '', handoverToken = '', lang = 'en' } = req.query
  pretendDbQuery((err, status) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    res.send(`
      <h1>Current Status</h1>
      <div id=stat>
        ${status}
      </div>
      <br />
      <a href="${prev}${handoverToken}/${lang}"> Back to Control HQ</a>
    `)
  })
})

function pretendDbQuery (cb) {
  const status = 'ON FIRE!!! HELP!!!'
  cb(null, status)
}

app.listen(3000)
