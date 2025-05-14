const t = require('assert')
const slugify = require('../')


describe('slugify', () => {

  it('throws', () => {
    try {
      slugify(undefined)
    } catch (err) {
      t.equal(err.message, 'slugify: string argument expected')
    }
  })

  it('replace whitespaces with replacement', () => {
    t.equal(slugify('foo bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo bar baz', '_'), 'foo_bar_baz')
  })

  it('remove duplicates of the replacement character', () => {
    t.equal(slugify('foo , bar'), 'foo-bar')
  })

  it('remove trailing space if any', () => {
    t.equal(slugify(' foo bar baz '), 'foo-bar-baz')
  })

  it('remove not allowed chars', () => {
    t.equal(slugify('foo, bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo- bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo] bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo  bar--baz'), 'foo-bar-baz')
  })

  it('leave allowed chars', () => {
    const allowed = ['*', '+', '~', '.', '(', ')', '\'', '"', '!', ':', '@']
    allowed.forEach((symbol) => {
      t.equal(
        slugify('foo ' + symbol + ' bar baz'),
        'foo-' + symbol + '-bar-baz'
      )
    })
  })

  it('options.replacement', () => {
    t.equal(slugify('foo bar baz', {replacement: '_'}), 'foo_bar_baz')
  })

  it('options.replacement - empty string', () => {
    t.equal(slugify('foo bar baz', {replacement: ''}), 'foobarbaz')
  })

  it('options.remove', () => {
    t.equal(slugify(
      'foo *+~.() bar \'"!:@ baz',
      {remove: /[$*_+~.()'"!\-:@]/g}
    ), 'foo-bar-baz')
  })

  it('options.remove regex without g flag', () => {
    t.equal(slugify(
      'foo bar, bar foo, foo bar',
      {remove: /[^a-zA-Z0-9 -]/}
    ), 'foo-bar-bar-foo-foo-bar')
  })

  it('options.lower', () => {
    t.equal(slugify('Foo bAr baZ', {lower: true}), 'foo-bar-baz')
  })

  it('options.strict', () => {
    t.equal(slugify('foo_bar. -@-baz!', {strict: true}), 'foobar-baz')
  })

  it('options.strict - remove duplicates of the replacement character', () => {
    t.equal(slugify('foo @ bar', {strict: true}), 'foo-bar')
  })

  it('options.replacement and options.strict', () => {
    t.equal(slugify('foo_@_bar-baz!', {
      replacement: '_',
      strict: true
    }), 'foo_barbaz')
  })

  it('replace latin chars', () => {
    const charMap = {
      'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
      'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I',
      'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O',
      'Õ': 'O', 'Ö': 'O', 'Ő': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U',
      'Ü': 'U', 'Ű': 'U', 'Ý': 'Y', 'Þ': 'TH', 'ß': 'ss', 'à': 'a', 'á': 'a',
      'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e',
      'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
      'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
      'ő': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ű': 'u',
      'ý': 'y', 'þ': 'th', 'ÿ': 'y', 'ẞ': 'SS'
    }
    for (let ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace greek chars', () => {
    const charMap = {
      'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'h', 'θ': '8',
      'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': '3', 'ο': 'o', 'π': 'p',
      'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w',
      'ά': 'a', 'έ': 'e', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ή': 'h', 'ώ': 'w', 'ς': 's',
      'ϊ': 'i', 'ΰ': 'y', 'ϋ': 'y', 'ΐ': 'i',
      'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'H', 'Θ': '8',
      'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': '3', 'Ο': 'O', 'Π': 'P',
      'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W',
      'Ά': 'A', 'Έ': 'E', 'Ί': 'I', 'Ό': 'O', 'Ύ': 'Y', 'Ή': 'H', 'Ώ': 'W', 'Ϊ': 'I',
      'Ϋ': 'Y'
    }
    for (let ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace turkish chars', () => {
    const charMap = {
      'ş': 's', 'Ş': 'S', 'ı': 'i', 'İ': 'I', 'ç': 'c', 'Ç': 'C', 'ü': 'u', 'Ü': 'U',
      'ö': 'o', 'Ö': 'O', 'ğ': 'g', 'Ğ': 'G'
    }
    for (let ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace cyrillic chars', () => {
    const charMap = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c',
      'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': 'u', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
      'я': 'ya',
      'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
      'З': 'Z', 'И': 'I', 'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
      'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C',
      'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sh', 'Ъ': 'U', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu',
      'Я': 'Ya', 'Є': 'Ye', 'І': 'I', 'Ї': 'Yi', 'Ґ': 'G', 'є': 'ye', 'і': 'i',
      'ї': 'yi', 'ґ': 'g'
    }
    for (let ch in charMap) {
      let expected = 'foo-' + charMap[ch] + '-bar-baz'
      if (!charMap[ch]) {
        expected = 'foo-bar-baz'
      }
      t.equal(slugify('foo ' + ch + ' bar baz'), expected)
    }
  })

  it('replace kazakh cyrillic chars', () => {
    const charMap = {
      'Ә': 'AE', 'ә': 'ae', 'Ғ': 'GH', 'ғ': 'gh', 'Қ': 'KH', 'қ': 'kh', 'Ң': 'NG', 'ң': 'ng',
      'Ү': 'UE', 'ү': 'ue', 'Ұ': 'U', 'ұ': 'u', 'Һ': 'H', 'һ': 'h', 'Ө': 'OE', 'ө': 'oe'
    }
    for (let ch in charMap) {
      let expected = 'foo-' + charMap[ch] + '-bar-baz'
      if (!charMap[ch]) {
        expected = 'foo-bar-baz'
      }
      t.equal(slugify('foo ' + ch + ' bar baz'), expected)
    }
  })

  it('replace czech chars', () => {
    const charMap = {
      'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
      'ž': 'z', 'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T',
      'Ů': 'U', 'Ž': 'Z'
    }
    for (let ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace polish chars', () => {
    const charMap = {
      'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z',
      'ż': 'z', 'Ą': 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L', 'Ń': 'N', 'Ś': 'S',
      'Ź': 'Z', 'Ż': 'Z'
    }
    for (let ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace latvian chars', () => {
    const charMap = {
      'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n',
      'š': 's', 'ū': 'u', 'ž': 'z', 'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i',
      'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N', 'Š': 'S', 'Ū': 'u', 'Ž': 'Z'
    }
    for (let ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace serbian chars', () => {
    const charMap = {
      'đ': 'dj', 'ǌ': 'nj', 'ǉ': 'lj', 'Đ': 'DJ', 'ǋ': 'NJ', 'ǈ': 'LJ', 'ђ': 'dj', 'ј': 'j',
      'љ': 'lj', 'њ': 'nj', 'ћ': 'c', 'џ': 'dz', 'Ђ': 'DJ', 'Ј': 'J', 'Љ': 'LJ', 'Њ': 'NJ',
      'Ћ': 'C', 'Џ': 'DZ'
    }
    for (let ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace currencies', () => {
    const charMap = {
      '€': 'euro', '₢': 'cruzeiro', '₣': 'french franc', '£': 'pound',
      '₤': 'lira', '₥': 'mill', '₦': 'naira', '₧': 'peseta', '₨': 'rupee',
      '₩': 'won', '₪': 'new shequel', '₫': 'dong', '₭': 'kip', '₮': 'tugrik', '₸': 'kazakhstani tenge',
      '₯': 'drachma', '₰': 'penny', '₱': 'peso', '₲': 'guarani', '₳': 'austral',
      '₴': 'hryvnia', '₵': 'cedi', '¢': 'cent', '¥': 'yen', '元': 'yuan',
      '円': 'yen', '﷼': 'rial', '₠': 'ecu', '¤': 'currency', '฿': 'baht',
      '$': 'dollar', '₽': 'russian ruble', '₿': 'bitcoin', "₺": "turkish lira"
    }
    for (let ch in charMap) {
      charMap[ch] = charMap[ch].replace(' ', '-')
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace symbols', () => {
    const charMap = {
      '©': '(c)', 'œ': 'oe', 'Œ': 'OE', '∑': 'sum', '®': '(r)', '†': '+',
      '“': '"', '”': '"', '‘': "'", '’': "'", '∂': 'd', 'ƒ': 'f', '™': 'tm',
      '℠': 'sm', '…': '...', '˚': 'o', 'º': 'o', 'ª': 'a', '•': '*',
      '∆': 'delta', '∞': 'infinity', '♥': 'love', '&': 'and', '|': 'or',
      '<': 'less', '>': 'greater'
    }
    for (let ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace custom characters', () => {
    slugify.extend({'☢': 'radioactive'})
    t.equal(slugify('unicode ♥ is ☢'), 'unicode-love-is-radioactive')

    delete require.cache[require.resolve('../')]
    slugify = require('../')

    t.equal(slugify('unicode ♥ is ☢'), 'unicode-love-is')
  })

  it('consolidates repeated replacement characters from extend()', () => {
    // https://github.com/simov/slugify/issues/144
    slugify.extend({'+': '-'})
    t.equal(slugify('day + night'), 'day-night')

    delete require.cache[require.resolve('../')]
    slugify = require('../')

    t.equal(slugify('day + night'), 'day-+-night')
  })

  it('normalize', () => {
    var slug = decodeURIComponent('a%CC%8Aa%CC%88o%CC%88-123') // åäö-123
    t.equal(slugify(slug, {remove: /[*+~.()'"!:@]/g}), 'aao-123')
  })

  it('replaces leading and trailing replacement chars', () => {
    t.equal(slugify('-Come on, fhqwhgads-'), 'Come-on-fhqwhgads')
  })

  it('replaces leading and trailing replacement chars in strict mode', () => {
    t.equal(slugify('! Come on, fhqwhgads !', { strict: true }), 'Come-on-fhqwhgads')
  })

  it('should preserve leading/trailing replacement characters if option set', function () {
    t.equal(slugify(' foo bar baz ', { trim: false }), '-foo-bar-baz-')
  })

  it('should correctly handle empty strings in charmaps', () => {
    slugify.extend({ 'ъ': '' })
    t.equal(slugify('ъяъ'), 'ya')
    t.equal(slugify('ъяъ', { remove: /[]/g }), 'ya')

    delete require.cache[require.resolve('../')]
    slugify = require('../')
  })
})
