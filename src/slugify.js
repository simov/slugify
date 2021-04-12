import charMap from '../config/charmap.json';
import locales from '../tmp/locales.json';

function replace (string, options) {
  if (typeof string !== 'string') {
    throw new Error('slugify: string argument expected')
  }

  options = (typeof options === 'string')
    ? {replacement: options}
    : options || {}

  var locale = locales[options.locale] || {}

  var replacement = options.replacement === undefined ? '-' : options.replacement

  var trim = options.trim === undefined ? true : options.trim

  var slug = string.normalize().split('')
    // replace characters based on charMap
    .reduce(function (result, ch) {
      var appendChar = locale[ch];
      if (appendChar === undefined) appendChar = charMap[ch];
      if (appendChar === undefined) appendChar = ch;
      if (appendChar === replacement) appendChar = ' ';
      return result + appendChar
        // remove not allowed characters
        .replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, '')
    }, '');

  if (options.strict) {
    slug = slug.replace(/[^A-Za-z0-9\s]/g, '');
  }

  if (trim) {
    slug = slug.trim()
  }

  // Replace spaces with replacement character, treating multiple consecutive
  // spaces as a single space.
  slug = slug.replace(/\s+/g, replacement);

  if (options.lower) {
    slug = slug.toLowerCase()
  }

  return slug
}

replace.extend = function (customMap) {
  Object.assign(charMap, customMap)
}

export default replace;
