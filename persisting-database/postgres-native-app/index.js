// Postgres is to expect a database named after the user
// account that owns a gives process.
const pg = require('pg').native || require('pg')
// username is read from the environment variable and attempts to connect to the
// database named after the current user on default port. DB is passwordless by default.
const db = new pg.Client()

const params = {
  author: process.argv[2],
  quotes: process.argv[3]
}

// connect and use database named after current user.
db.connect((err) => {
  if (err) {
    throw err
  }
  db.query(`
    CREATE TABLE IF NOT EXISTS quotes (
      id SERIAL,
      author VARCHAR (128) NOT NULL,
      quote TEXT NOT NULL, PRIMARY KEY ( id )
    )
  `, (err) => {
    if (err) {
      throw err
    }

    if (params.author && params.quote) {
      db.query(`
        INSERT INTO quotes (author, quote)
        VALUES ($1, $2);
      `, [params.author, params.quote], (err) => {
        if (err) throw err
        list(db, params)
      })
    }

    if (!params.quote) {
      list(db, params)
    }
  })
})

// sends a select query with clean user input
function list (db, params) {
  if (!params.author) {
    return db.end()
  }
  db.query(`
    SELECT * FROM quotes
    WHERE author LIKE $1
  `, [params.author], (err, results) => {
    if (err) {
      throw err
    }
    results.rows.forEach(({ author, quote }) => {
      console.log(`${author} ${quote}`)
    })
    db.end()
  })
}
