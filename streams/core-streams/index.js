const { Readable, Writable } = require('readable-stream')

const rs = Readable({
  // for node 4 and above
  read: () => {
    rs.push(Buffer.from('hello, world!'))
    rs.push(null)
  }
})

const ws = Writable({
  write: (data, enc, cb) => {
    console.log(`Data written: ${data.toString()}`)
    cb()
  }
})

rs.pipe(ws)
