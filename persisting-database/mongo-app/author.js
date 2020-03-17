// Applying an index to the author field
const { MongoClient } = require('mongodb')
const client = new MongoClient()

client.connect('mongodb://localhost:27018/quotes', ready)

function ready (err, db) {
  if (err) {
    throw err
  }
  const collection = db.collection('quotes')
  // creates an index only if one doesn't already exist.
  collection.ensureIndex('author', (err) => {
    if (err) {
      throw err
    }
    collection.distinct('author', (err, result) => {
      if (err) {
        throw err
      }
      console.log(result.join('\n'))
      db.close()
    })
  })
}
