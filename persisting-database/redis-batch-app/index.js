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
  add(params, (err) => {
    if (err) {
      throw err
    }
  })
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

function add ({ author, quote }, cb) {
  const key = `Quotes: ${uuid}`
  // Allows multiple hashes to be created
  client
    // puts redis client into batch mode, queuing each command
    .multi()
    // Allows multiple hashes to be created
    .hmset(key, { author, quote })
    // Allows to add a member to Redis set (e.g. like an array)
    .sadd(`Author: ${params.author}`, key)
    // list of commands are sent in one go
    .exec((err, replies) => {
      if (err) {
        return cb(err)
      }
      if (replies[0] === '0') {
        console.log('Added...\m')
      }
      cb()
    })
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
