// Pulling data from a stream.
const fs = require('fs')
const rs = fs.createReadStream(__filename)

// Readable event is triggered multiple times as data become available
// once no data is left to read it returns null
rs.on('readable', () => {
  var data = rs.read()
  while (data !== null) {
    console.log('Read chunk:', data)
    data = rs.read()
  }
})

rs.on('end', () => {
  console.log('No more data')
})
