const { MongoClient, ObjectID } = require('mongodb')
const client = new MongoClient()
const params = { id: process.argv[2] }

client.connect('mongodb://localhost:27017/quotes', ready)

function ready (err, db) {
  if (err) {
    throw err
  }
  const collection = db.collection('quotes')

  // If an argument is supplied it's loaded into params.id, if params.id is
  // empty, then we'll print out the ID of each quote in our collection.
  if (!params.id) {
    showIds(collection, db)
    return
  }

  vote(params.id, db, collection)
}

function showIds (collection, db) {
  collection.find().each((err, doc) => {
    if (err) {
      throw err
    }
    if (doc) {
      console.log(doc._id, doc.quote)
      return
    }
    db.close()
  })
}

function vote (id, db, collection) {
  // MongoDB IDs must be encoded as a Binary JSON (BSON) ObjectID. Otherwise,
  // the update command will look for a string, failing to find it. So, we convert
  // id into an ObjectID using the mongodb ObjectID function
  const query = {
    _id: ObjectID(id)
  }
  const action = { $inc: { votes: 1 } }
  const opts = { safe: true }
  collection.update(query, action, opts, (err) => {
    if (err) {
      throw err
    }
    console.log('1 vote added to %s by %s', params.id)
    const by = { votes: 1 }
    const max = 10
    collection.find().sort(by).limit(max).each((err, doc) => {
      if (err) {
        throw err
      }
      if (doc) {
        const votes = doc.votes || 0
        console.log(`${votes} | ${doc.author}: ${doc.quote.substr(0, 30)}...`)
        return
      }
      db.close()
    })
  })
  return
}
