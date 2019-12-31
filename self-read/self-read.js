const fs = require('fs')
const rs = fs.createReadStream('/dev/urandom')
var size = 0

// attach a data listener called on every chunk read
rs.on('data', (data) => {
  size += data.length
  console.log('File size', size)
})

/*
rs.on('end', () => {
  console.log('No more data')
})
*/
