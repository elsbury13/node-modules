// Fast hashing algorithm used to generate keys
const {hash} = require('xxhash')
// reliably detects when a stream has ended/finished, errored
const through = require('through2')
const eos = require('end-of-stream')
// combination of LevelDOWN which provides native C++ bindings
// to the LevelDB embedded library, and LevelUP which provides a cohesive API layer
const levelup = require('levelup')
// supports MySQL and Postgres
const sqldown = require('sqldown')
const db = levelup('./data', { db: sqldown })

const params = {
  author: process.argv[2],
  quote: process.argv[3]
}

if (params.author && params.quote) {
  add(params, (err) => {
    if (err) {
      console.log(err)
    }
    list(params.author)
  })
  return
}

if (params.author) {
  list(params.author)
  return
}

function add ({ quote, author }, cb) {
  // create a unique key
  const key = author + hash(Buffer.from(quote), 0xDAF1DC)
  db.put(key, quote, cb)
}

function list (author) {
  if (!author) {
    db.close()
  }
  // gte = output all values whose keys are lexicographically greater than or equal to author
  // lt = the character which is the next code point up from the first character in the authors name
  // So here we're telling LevelDB to give us every key whose lexicographical value is less than
  // (but not including) the next code point up.
  const quotes = db.createValueStream({
    gte: author,
    lt: String.fromCharCode(author.charCodeAt(0) + 1)
  })
  // takes each quote and prefixes with author. Outputs stream to proccess.stdout
  const format = through((quote, enc, cb) => {
    cb(null, `${author} ${quote}`)
  })
  quotes.pipe(format).pipe(process.stdout)
  eos(format, () => {
    db.close()
    console.log()
  })
}
