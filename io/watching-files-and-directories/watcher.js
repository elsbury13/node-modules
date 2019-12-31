const fs = require('fs')
const human = require('human-time')

const interval = 5007
const file = process.argv[2]
var exists = true

if (!file) {
  console.error('Supply a file')
  process.exit(1)
}

const created = ({ birthtime }) => {
  return !exists && (Date.now() - birthtime) < interval
}

const missing = ({ birthtime, mtime, atime, ctime }) => {
  return !(birthtime | mtime | atime | ctime)
}

const updated = (cur, prv) => cur.mtime !== prv.mtime

// Poll specified file and log out activity from listener
fs.watchFile(file, { interval }, (cur, prv) => {
  if (missing(cur)) {
    const msg = exists ? 'removed' : 'doesn\'t exist'
    exists = false
    return console.log(`${file} ${msg}`)
  }

  if (created(cur)) {
    exists = true
    return console.log(`${file} created ${human((cur.birthtime))}`)
  }

  exists = true

  if (updated(cur, prv)) {
    return console.log(`${file} updated ${human((cur.mtime))}`)
  }

  console.log(`${file} modified ${human((cur.mtime))}`)
})
