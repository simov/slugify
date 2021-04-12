import charMap from '../config/charmap.json';
import locales from '../src/locales.json';

function replace (string, options) {
  if (typeof string !== 'string') {
    throw new Error('slugify: string argument expected')
  }

  options = (typeof options === 'string')
    ? {replacement: options}
    : options || {}

  var locale = locales[options.locale] || {}

  var replacement = options.replacement === undefined ? '-' : options.replacement

  var slug = string.normalize().split('')
    // replace characters based on charMap
    .reduce(function (result, ch) {
      return result + (locale[ch] || charMap[ch] || ch)
        // remove not allowed characters
        .replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, '')
    }, '')
    // trim leading/trailing spaces
    .trim()
    // convert spaces to replacement character
    // also remove duplicates of the replacement character
    .replace(new RegExp('[\\s' + replacement + ']+', 'g'), replacement)

  if (options.lower) {
    slug = slug.toLowerCase()
  }

  if (options.strict) {
    // remove anything besides letters, numbers, and the replacement char
    slug = slug
      .replace(new RegExp('[^a-zA-Z0-9' + replacement + ']', 'g'), '')
      // remove duplicates of the replacement character
      .replace(new RegExp('[\\s' + replacement + ']+', 'g'), replacement)
  }

  return slug
}

replace.extend = function (customMap) {
  Object.assign(charMap, customMap)
}

export default replace;
