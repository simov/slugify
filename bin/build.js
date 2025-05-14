
const fs = require('fs')
const path = require('path')

const charmap = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../config/charmap.json'), 'utf8'))

const locales = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../config/locales.json'), 'utf8'))


const sort = (obj) =>
  Object.keys(obj)
    .sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
    .reduce((all, key) => (all[key] = obj[key], all), {})

const clean = (locales) =>
  Object.keys(locales)
    .reduce((all, locale) => (
      all[locale] =
        Object.keys(locales[locale])
          .filter((key) => key !== 'locale')
          .reduce((all, key) => (all[key] = locales[locale][key], all), {}),
      all
    ), {})


const build = () => {
  // update charmap - remove duplicates and sort
  fs.writeFileSync(
    path.resolve(__dirname, '../config/charmap.json'),
    JSON.stringify(sort(charmap), null, 2),
    'utf8'
  )

  // update slugify
  const source =
    fs.readFileSync(path.resolve(__dirname, '../slugify.js'), 'utf8')
      .replace(
        /let charMap = JSON\.parse\(.*\)/,
        `let charMap = JSON.parse('${JSON.stringify(sort(charmap)).replace(/'/g, '\\\'')}')`
      )
      .replace(
        /let locales = JSON\.parse\(.*\)/,
        `let locales = JSON.parse('${JSON.stringify(clean(locales))}')`
      )
  fs.writeFileSync(path.resolve(__dirname, '../slugify.js'), source, 'utf8')
}

build()
