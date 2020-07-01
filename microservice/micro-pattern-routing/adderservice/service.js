module.exports = service

function service () {
  function add (args, cb) {
    const { first, second } = args
    const result = (parseInt(first, 10) + parseInt(second, 10))
    // invoke its callback with an object containing a key (result)
    // instead of passing the result as a string
    cb(null, { result: result.toString() })
  }

  return { add }
}
