var fs = require('fs')

function sortCharmap () {
  var charmap = JSON.parse(fs.readFileSync('charmap.json', 'utf8'))
  var sorted = charmap.sort(function (a, b) {
    return a.key > b.key ? 1 : a.key < b.key ? -1 : 0
  })
  fs.writeFileSync('charmap.json', JSON.stringify(sorted, null, 2), 'utf8')
}

function replaceCharmap () {
  var charmap = JSON.parse(fs.readFileSync('charmap.json', 'utf8'))
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

sortCharmap()
replaceCharmap()
