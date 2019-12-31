const fs = require('fs')
const rs = fs.createReadStream(__filename)

// attach a data listener called on every chunk read
rs.on('data', (data) => {
  console.log('Read chunk', data)
})

rs.on('end', () => {
  console.log('No more data')
})

// We should never use the stream module directly.
// The behaviour of stream modules can change in node versions
// Safer to use reasable-stream as its compatible with all versions
