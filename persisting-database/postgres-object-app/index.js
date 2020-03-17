// Postgres is to expect a database named after the user
// account that owns a gives process.
const pg = require('pg')
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
    CREATE TABLE IF NOT EXISTS quote_docs (
      id SERIAL,
      doc jsonb,
      CONSTRAINT author CHECK (length(doc->>'author') > 0 AND (doc->>'author') IS NOT NULL),
      CONSTRAINT quote CHECK (length(doc->>'quote') > 0 AND (doc->>'quote') IS NOT NULL)
    )
  `, (err) => {
    if (err) {
      throw err
    }

    if (params.author && params.quote) {
      db.query(`
        INSERT INTO quote_docs (doc)
        VALUES ($1);
      `, [params], (err) => {
        if (err) {
          throw err
        }
        list(db, params)
      })
    }

    if (!params.quote) {
      list(db, params)
    }
  })
})

// sends a select query with clean user input
// queries object data
function list (db, params) {
  if (!params.author) {
    return db.end()
  }
  db.query(`
    SELECT * FROM quote_docs
    WHERE doc ->> 'author' LIKE ${db.escapeLiteral(params.author)}
  `, (err, results) => {
    if (err) {
      throw err
    }
    results.rows
      .map(({ doc }) => doc)
      .forEach(({ author, quote }) => {
        console.log(`${author} ${quote}`)
      })
    db.end()
  })
}
