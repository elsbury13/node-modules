# level DB App
It's a log-structured key-value store purposed for fast read/write access of large data sets.

LevelDB has no command line or server interface, it's intended for use directly as a library. One of the advantages of an embedded database is we eliminate peer dependencies - we don't have to assume that a database is available at a certain host and port, we simply require a module and use the database directly.

Will store data in LevelDB

## How to add quote
`node index.js "<Author>" "<Quote>"`

## How to list quotes by author
`node index.js "<Author>"`
