
var fs = require('fs')
var charmap = require('./charmap')


exports.sort = function () {
  var sorted = charmap.sort(function (a, b) {
    return a.key > b.key ? 1 : a.key < b.key ? -1 : 0
  })
  fs.writeFileSync('charmap.json', JSON.stringify(sorted, null, 2), 'utf8')
}

exports.duplicates = function () {
  var cache = {}
  var duplicates = []
  charmap.forEach(function (pair) {
    if (!cache[pair.key]) {
      cache[pair.key] = pair
    }
    else {
      duplicates.push(pair)
    }
  })
  return {
    cache: cache,
    duplicates: duplicates
  }
}

exports.replace = function () {
  var obj = charmap.reduce(function (obj, pair) {
    obj[pair.key] = pair.value
    return obj
  }, {})

  var json = JSON.stringify(obj).replace(/'/g, '\\\'')

  var source =
  fs.readFileSync('index.js', 'utf8')
    .replace(
      /var charMap = JSON\.parse\(.*\)/,
      'var charMap = JSON.parse(\'' + json + '\')'
    )

  fs.writeFileSync('index.js', source, 'utf8')
}
