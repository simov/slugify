
var t = require('assert')

describe('slugify', function () {
  var build = require('./build')
  var slugify

  before(function () {
    build.replace()
    slugify = require('./')
  })

  it('throws', function () {
    try {
      slugify(undefined)
    }
    catch (err) {
      t.equal(err.message, 'slugify: string argument expected')
    }
  })

  it('duplicates characters are not allowed', function () {
    var result = build.duplicates()
    t.equal(
      result.duplicates.length,
      0,
      'duplicates: ' + result.duplicates
        .map(function (pair) {
          return pair.key
        })
        .join()
    )
  })

  it('replace whitespaces with replacement', function () {
    t.equal(slugify('foo bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo bar baz', '_'), 'foo_bar_baz')
  })

  it('remove trailing space if any', function () {
    t.equal(slugify(' foo bar baz '), 'foo-bar-baz')
  })

  it('remove not allowed chars', function () {
    t.equal(slugify('foo, bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo- bar baz'), 'foo-bar-baz')
    t.equal(slugify('foo] bar baz'), 'foo-bar-baz')
  })

  it('leave allowed chars', function () {
    var allowed = ['*', '+', '~', '.', '(', ')', '\'', '"', '!', ':', '@']
    allowed.forEach(function (symbol) {
      t.equal(
        slugify('foo ' + symbol + ' bar baz'),
        'foo-' + symbol + '-bar-baz'
      )
    })
  })

  it('options.replacement', function () {
    t.equal(slugify('foo bar baz', {replacement: '_'}), 'foo_bar_baz')
  })

  it('options.remove', function () {
    t.equal(slugify(
      'foo *+~.() bar \'"!:@ baz',
      {remove: /[$*_+~.()'"!\-:@]/g}
    ), 'foo-bar-baz')
  })

  it('options.lower', function () {
    t.equal(slugify('Foo bAr baZ', {lower: true}), 'foo-bar-baz')
  })

  it('replace latin chars', function () {
    var charMap = {
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
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace greek chars', function () {
    var charMap = {
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
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace turkish chars', function () {
    var charMap = {
      'ş': 's', 'Ş': 'S', 'ı': 'i', 'İ': 'I', 'ç': 'c', 'Ç': 'C', 'ü': 'u', 'Ü': 'U',
      'ö': 'o', 'Ö': 'O', 'ğ': 'g', 'Ğ': 'G'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace cyrillic chars', function () {
    var charMap = {
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
    for (var ch in charMap) {
      var expected = 'foo-' + charMap[ch] + '-bar-baz'
      if (!charMap[ch]) {
        expected = 'foo-bar-baz'
      }
      t.equal(slugify('foo ' + ch + ' bar baz'), expected)
    }
  })

  it('replace czech chars', function () {
    var charMap = {
      'č': 'c', 'ď': 'd', 'ě': 'e', 'ň': 'n', 'ř': 'r', 'š': 's', 'ť': 't', 'ů': 'u',
      'ž': 'z', 'Č': 'C', 'Ď': 'D', 'Ě': 'E', 'Ň': 'N', 'Ř': 'R', 'Š': 'S', 'Ť': 'T',
      'Ů': 'U', 'Ž': 'Z'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace polish chars', function () {
    var charMap = {
      'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z',
      'ż': 'z', 'Ą': 'A', 'Ć': 'C', 'Ę': 'e', 'Ł': 'L', 'Ń': 'N', 'Ś': 'S',
      'Ź': 'Z', 'Ż': 'Z'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace latvian chars', function () {
    var charMap = {
      'ā': 'a', 'č': 'c', 'ē': 'e', 'ģ': 'g', 'ī': 'i', 'ķ': 'k', 'ļ': 'l', 'ņ': 'n',
      'š': 's', 'ū': 'u', 'ž': 'z', 'Ā': 'A', 'Č': 'C', 'Ē': 'E', 'Ģ': 'G', 'Ī': 'i',
      'Ķ': 'k', 'Ļ': 'L', 'Ņ': 'N', 'Š': 'S', 'Ū': 'u', 'Ž': 'Z'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace serbian chars', function () {
    var charMap = {
      'đ': 'dj', 'ǌ': 'nj', 'ǉ': 'lj', 'Đ': 'DJ', 'ǋ': 'NJ', 'ǈ': 'LJ', 'ђ': 'dj', 'ј': 'j',
      'љ': 'lj', 'њ': 'nj', 'ћ': 'c', 'џ': 'dz', 'Ђ': 'DJ', 'Ј': 'J', 'Љ': 'LJ', 'Њ': 'NJ',
      'Ћ': 'C', 'Џ': 'DZ'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace currencies', function () {
    var charMap = {
      '€': 'euro', '₢': 'cruzeiro', '₣': 'french franc', '£': 'pound',
      '₤': 'lira', '₥': 'mill', '₦': 'naira', '₧': 'peseta', '₨': 'rupee',
      '₩': 'won', '₪': 'new shequel', '₫': 'dong', '₭': 'kip', '₮': 'tugrik',
      '₯': 'drachma', '₰': 'penny', '₱': 'peso', '₲': 'guarani', '₳': 'austral',
      '₴': 'hryvnia', '₵': 'cedi', '¢': 'cent', '¥': 'yen', '元': 'yuan',
      '円': 'yen', '﷼': 'rial', '₠': 'ecu', '¤': 'currency', '฿': 'baht',
      '$': 'dollar', '₽': 'russian ruble'
    }
    for (var ch in charMap) {
      charMap[ch] = charMap[ch].replace(' ', '-')
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace symbols', function () {
    var charMap = {
      '©': '(c)', 'œ': 'oe', 'Œ': 'OE', '∑': 'sum', '®': '(r)', '†': '+',
      '“': '"', '”': '"', '‘': "'", '’': "'", '∂': 'd', 'ƒ': 'f', '™': 'tm',
      '℠': 'sm', '…': '...', '˚': 'o', 'º': 'o', 'ª': 'a', '•': '*',
      '∆': 'delta', '∞': 'infinity', '♥': 'love', '&': 'and', '|': 'or',
      '<': 'less', '>': 'greater'
    }
    for (var ch in charMap) {
      t.equal(slugify('foo ' + ch + ' bar baz'), 'foo-' + charMap[ch] + '-bar-baz')
    }
  })

  it('replace custom characters', function () {
    slugify.extend({'☢': 'radioactive'})
    t.equal(slugify('unicode ♥ is ☢'), 'unicode-love-is-radioactive')

    delete require.cache[require.resolve('./')]
    slugify = require('./')

    t.equal(slugify('unicode ♥ is ☢'), 'unicode-love-is')
  })

  describe('alphabets', function () {
    it('bulgarian', function () {
      var alphabet =
        'А а, Б б, В в, Г г, Д д, Е е, Ж ж, З з, И и, Й й, ' +
        'К к, Л л, М м, Н н, О о, П п, Р р, С с, Т т, У у, ' +
        'Ф ф, Х х, Ц ц, Ч ч, Ш ш, Щ щ, Ъ ъ, ѝ ь, Ю ю, Я я'

      t.equal(slugify(alphabet),
        'A-a-B-b-V-v-G-g-D-d-E-e-Zh-zh-Z-z-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-C-c-Ch-ch-Sh-sh-Sh-sh-U-u-Yu-yu-Ya-ya'
      )
    })

    it('serbian', function () {
      var alphabets = {
        latin:
          'A a, B b, V v, G g, D d, Đ đ, E e, Ž ž, Z z, I i, ' +
          'J j, K k, L l, Lj lj, M m, N n, Nj nj, O o, P p, R r, ' +
          'S s, T t, Ć ć, U u, F f, H h, C c, Č č, Dž dž, Š š',
        cyrillic:
          'А а, Б б, В в, Г г, Д д, Ђ ђ, Е е, Ж ж, З з, И и, ' +
          'Ј ј, К к, Л л, Љ љ, М м, Н н, Њ њ, О о, П п, Р р, ' +
          'С с, Т т, Ћ ћ, У у, Ф ф, Х х, Ц ц, Ч ч, Џ џ, Ш ш'
      }
      t.equal(slugify(alphabets.latin),
        'A-a-B-b-V-v-G-g-D-d-DJ-dj-E-e-Z-z-Z-z-I-i-J-j-K-k-L-l-Lj-lj-M-m-N-n-Nj-nj-O-o-P-p-R-r-S-s-T-t-C-c-U-u-F-f-H-h-C-c-C-c-Dz-dz-S-s'
      )
      t.equal(slugify(alphabets.cyrillic),
        'A-a-B-b-V-v-G-g-D-d-DJ-dj-E-e-Zh-zh-Z-z-I-i-J-j-K-k-L-l-LJ-lj-M-m-N-n-NJ-nj-O-o-P-p-R-r-S-s-T-t-C-c-U-u-F-f-H-h-C-c-Ch-ch-DZ-dz-Sh-sh'
      )
    })

    it('turkish', function () {
      var alphabet =
        'A a, B b, C c, Ç ç, D d, E e, F f, G g, Ğ ğ, H h, ' +
        'I ı, İ i, J j, K k, L l, M m, N n, O o, Ö ö, P p, ' +
        'R r, S s, Ş ş, T t, U u, Ü ü, V v, Y y, Z z'

      t.equal(slugify(alphabet),
        'A-a-B-b-C-c-C-c-D-d-E-e-F-f-G-g-G-g-H-h-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-O-o-P-p-R-r-S-s-S-s-T-t-U-u-U-u-V-v-Y-y-Z-z'
      )
    })

    it('georgian', function () {
      var alphabet =
        'ა, ბ, გ, დ, ე, ვ, ზ, თ, ი, კ, ლ, ' +
        'მ, ნ, ო, პ, ჟ, რ, ს, ტ, უ, ფ, ქ, ' +
        'ღ, ყ, შ, ჩ, ც, ძ, წ, ჭ, ხ, ჯ, ჰ'

      t.equal(slugify(alphabet),
        'a-b-g-d-e-v-z-t-i-k-l-m-n-o-p-zh-r-s-t-u-f-k-gh-q-sh-ch-ts-dz-ts-ch-kh-j-h'
      )
    })
  })

  after(function () {
    build.sort()
  })
})
