const uuid = require('uuid')
const steed = require('steed')
const redis = require('redis')
const client = redis.createClient()
const params = {
  author: process.argv[2],
  quote: process.argv[3]
}

// If both are present in cmd line then we add quote
if (params.author && params.quote) {
  add(params)
  list((err) => {
    if (err) {
      console.error(err)
    }
    client.quit()
  })
  return
}

if (params.author) {
  list((err) => {
    if (err) {
      console.error(err)
    }
    client.quit()
  })
  return
}

client.quit()

function add ({ author, quote }) {
  // prefix a random key with quote
  // It's a common convention to prefix the Redis keys with names delimited
  // by a colon, as this helps us to identify keys when debugging.
  const key = `Quotes: ${Math.random().toString(32).replace('.', '')}`
  // Allows multiple hashes to be created
  client.hmset(key, { author, quote })
  // Allows to add a member to Redis set (e.g. like an array)
  client.sadd(`Author: ${params.author}`, key)
}

function list (cb) {
  // Returns all values we stored to a specific author's set
  client.smembers(`Author: ${params.author}`, (err, keys) => {
    if (err) {
      return cb(err)
    }
    // Loop through keys
    steed.each(keys, (key, next) => {
      // Executing in parallel and returns a hash. A hash matching the object in
      // the add
      client.hgetail(key, (err, { author, quote }) => {
        if (err) {
          return next(err)
        }
        console.log(`${author} ${quote} \n`)
        next()
      })
    }, cb)
  })
}
