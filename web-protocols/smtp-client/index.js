const os = require('os')
const readLine = require('readline')
const smtp = require('smtp-protocol')

// creates interactive shell for sending mail
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
})

// config object to hold mail settings
const cfg = {
  host: 'localhost',
  prot: 2525,
  email: 'me@me.com',
  hostname: os.hostname()
}

// Listen for the Ctrl + C key combination to cancel writing an email.
// and quit the shell. Ctrl + D to tell the interface that we are done and ready to send.
rl.on('SIGINT', () => {
  console.log('... cancelled ...')
  process.exit()
})

// SMTP connection
// This is analogous to the netconnect
smtp.connect(cfg.host, cfg.prot, (mail) => {
  // interact with protocol in a direct way, calling representative functions
  mail.helo(cfg.hostname)
  mail.from(cfg.email)
  rl.question('To: ', (to) => {
    // split for multiple addresses abd call mail.to to each recipient
    to.split(/;|,/gm).forEach((rcpt) => mail.to(rcpt))
    rl.write('==== Message (^D to send) ====\n')
    mail.data(exitOnFail)
    const body = []
    rl.on('line', (line) => body.push(`${line}\r\n`))
    rl.on('close', () => send(mail, body))
  })
})

function send (mail, body) {
  console.log('...sending...')
  const message = mail.message()
  body.forEach(message.write, message)
  message.end()
  mail.quit()
}

function exitOnFail (err, code, lines, info) {
  if (code === 550) {
    err = Error(`No Mailbox for recipient "${info.rcpt}"`)
  }
  if (!err && code !== 354 && code !== 250 && code !== 220 && code !== 200) {
    err = Error(`Protocol Error: ${code} ${lines.join('')}`)
  }
  if (!err) {
    return
  }
  console.log(err.message)
  process.exit(1)
}
