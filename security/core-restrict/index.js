module.exports = function (name) {
  // checks the loaded module cache
  require.cache[name] = {}
  // We override the cache with that namespace and use
  // Object.defineProperty to make a property definition on the
  // exports key that throws an error when the key is accessed.
  Object.defineProperty(require.cache[name], 'exports', {
    get: () => {
      throw Error(`The ${name} module is restricted`)
    }
  })
}
