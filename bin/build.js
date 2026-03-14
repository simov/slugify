
var fs = require('fs')
var path = require('path')

var charmap = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../config/charmap.json'), 'utf8'))

var locales = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../config/locales.json'), 'utf8'))


var sort = (obj) =>
  Object.keys(obj)
    .sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
    .reduce((all, key) => (all[key] = obj[key], all), {})

var clean = (locales) =>
  Object.keys(locales)
    .reduce((all, locale) => (
      all[locale] =
        Object.keys(locales[locale])
          .filter((key) => key !== 'locale')
          .reduce((all, key) => (all[key] = locales[locale][key], all), {}),
      all
    ), {})


var build = () => {
  // update charmap - remove duplicates and sort
  fs.writeFileSync(
    path.resolve(__dirname, '../config/charmap.json'),
    JSON.stringify(sort(charmap), null, 2),
    'utf8'
  )

  // update locales.json in tmp folder
  var tmpDir = path.resolve(__dirname, '../tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }
  fs.writeFileSync(
    path.resolve(tmpDir, 'locales.json'),
    JSON.stringify(clean(locales), null, 2),
    'utf8'
  )
}

build()
