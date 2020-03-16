const fs = require('fs')
const path = require('path')
const smtp = require('smtp-protocol')

// Only going to accept emails from certain host domains for certain users
// Whitelist
const hosts = new Set(['localhost', 'example.com'])
const users = new Set(['you', 'another'])
const mailDir = path.join(__dirname, 'mail')

// Make sure that the mail directory and user mailboxes exist
function ensureDir (dir, cb) {
  try {
    fs.mkdirSync(dir)
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw e
    }
  }
}

ensureDir(mailDir)

for (let user of users) {
  ensureDir(path.join(mailDir, user))
}

// req is an object of event emitter.
const server = smtp.createServer((req) => {
  // listen for to, message and error
  req.on('to', filter)
  req.on('message', (stream, ack) => {
    save(req, stream, ack)
  })
  req.on('error', (err) => console.log(err))
})

server.listen(2525)

// Deconstruct the intended email address and check hosts and users whitelist
function filter (to, { accept, reject }) {
  const [user, host] = to.split('@')
  if (hosts.has(host) && users.has(user)) {
    accept()
    return
  }
  reject(550, 'mailbox not available')
}

// Takes incoming message and saves to relevant mailbox
function save (req, stream, { accept }) {
  const { from, to } = req
  accept()
  to.forEach((rcpt) => {
    const [user] = rcpt.split('@')
    const dest = path.join(mailDir, user, `${from}-${Date.now()}`)
    const mail = fs.createWriteStream(dest)
    mail.write(`From: ${from} \n`)
    mail.write(`To: ${rcpt} \n\n`)
    stream.pipe(mail, { end: false })
  })
}
