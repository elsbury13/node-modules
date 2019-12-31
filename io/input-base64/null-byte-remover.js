// queue a function every 10ms that write . to stdout
// unref() prevents the timer from keepijng the process alive
setInterval(() => process.stdout.write('.'), 10).unref()

// Core modules
const fs = require('fs')
const path = require('path')
// current working dir
const cwd = process.cwd()

fs.readFile(path.join(cwd, 'file.dat'), (err, bytes) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  const clean = bytes.filter(n => n)

  fs.writeFile(path.join(cwd, 'clean.dat'), clean, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    fs.appendFile(
      path.join(cwd, 'log.txt'),
      (new Date) + ' ' + (bytes.length - clean.length) + ' bytes removed\n'
    )
  })
})
