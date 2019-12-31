var request = require('request')
var npmDb = 'https://skimdb.npmjs.com'
var registryUrl = `${npmDb}/registry/_changes?include_docs=true`

request(registryUrl, function (err, data) {
  if (err) {
    throw err
  }

  var numberOfLines = data.split('\n').length + 1
  console.log('Total modules on npm:' + numberOfLines)
})
