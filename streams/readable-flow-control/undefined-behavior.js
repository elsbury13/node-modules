// WARNING: DOES NOT WORK AS EXPECTED
// produces a stream of alternating data 0 and data 1 but has undefined behaviour
const { Readable } = require('readable-stream')
const rs = Readable({
  read: () => {
    setTimeout(() => {
      rs.push('Data 0')
      setTimeout(() => {
        rs.push('Data 1')
      }, 50)
    }, 100)
  }
})

rs.on('data', (data) => {
  console.log(data.toString())
})
