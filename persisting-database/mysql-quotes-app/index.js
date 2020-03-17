const mysql = require('mysql')

// establishes connection and returns db
const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  insecureAuth: true
  //debug: true
})

// ignore errors if tables and database exist already
const ignore = new Set([
  'ER_DB_CREATE_EXISTS',
  'ER_TABLE_EXISTS_ERROR'
])

const params = {
  author: process.argv[2],
  quote: process.argv[3]
}

db.query('CREATE DATABASE quotes')
db.query('USE quotes')

db.query(
  'CREATE TABLE quotes.quotes (' +
  'id INT NOT NULL AUTO_INCREMENT, ' +
  'author VARCHAR (128) NOT NULL, ' +
  'quote TEXT NOT NULL, PRIMARY KEY (id) ' +
  ')'
)

db.on('error', (err) => {
  if (ignore.has(err.code)) {
    return
  }
  throw err
})

if (params.author && params.quote) {
  db.query(
    `INSERT INTO quotes.quotes (author, quote)
    VALUES (?, ?);`,
    [params.author, params.quote]
  )
}

if (params.author) {
  db.query(`
    SELECT * FROM quotes
    WHERE author LIKE ${db.escape(params.author)}
  `).on('result', ({ author, quote }) => {
    console.log(`${author} ${quote}`)
  })
}

db.end()
