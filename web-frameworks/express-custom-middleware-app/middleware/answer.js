function answer () {
  return (req, res, next) => {
    res.setHeader('X-Answer', 42)
    next()
  }
}

module.exports = answer
