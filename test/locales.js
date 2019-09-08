
var t = require('assert')
var slugify = require('../')


describe('locale', function () {
  it('bg - bulgarian', function () {
    var alphabet =
      'А а, Б б, В в, Г г, Д д, Е е, Ж ж, З з, И и, Й й, ' +
      'К к, Л л, М м, Н н, О о, П п, Р р, С с, Т т, У у, ' +
      'Ф ф, Х х, Ц ц, Ч ч, Ш ш, Щ щ, Ъ ъ, ѝ ь, Ю ю, Я я'

    t.equal(slugify(alphabet, {locale: 'bg'}),
      'A-a-B-b-V-v-G-g-D-d-E-e-Zh-zh-Z-z-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-C-c-Ch-ch-Sh-sh-Sh-sh-U-u-u-Yu-yu-Ya-ya'
    )
  })

  it('sr-c - serbian cyrillic', function () {
    var alphabet =
      'А а, Б б, В в, Г г, Д д, Ђ ђ, Е е, Ж ж, З з, И и, ' +
      'Ј ј, К к, Л л, Љ љ, М м, Н н, Њ њ, О о, П п, Р р, ' +
      'С с, Т т, Ћ ћ, У у, Ф ф, Х х, Ц ц, Ч ч, Џ џ, Ш ш'

    t.equal(slugify(alphabet, {locale: 'sr-c'}),
      'A-a-B-b-V-v-G-g-D-d-DJ-dj-E-e-Zh-zh-Z-z-I-i-J-j-K-k-L-l-LJ-lj-M-m-N-n-NJ-nj-O-o-P-p-R-r-S-s-T-t-C-c-U-u-F-f-H-h-C-c-Ch-ch-DZ-dz-Sh-sh'
    )
  })

  it('sr-l - serbian latin', function () {
    var alphabet =
      'A a, B b, V v, G g, D d, Đ đ, E e, Ž ž, Z z, I i, ' +
      'J j, K k, L l, Lj lj, M m, N n, Nj nj, O o, P p, R r, ' +
      'S s, T t, Ć ć, U u, F f, H h, C c, Č č, Dž dž, Š š'

    t.equal(slugify(alphabet, {locale: 'sr-l'}),
      'A-a-B-b-V-v-G-g-D-d-DJ-dj-E-e-Z-z-Z-z-I-i-J-j-K-k-L-l-Lj-lj-M-m-N-n-Nj-nj-O-o-P-p-R-r-S-s-T-t-C-c-U-u-F-f-H-h-C-c-C-c-Dz-dz-S-s'
    )
  })

  it('tr - turkish', function () {
    var alphabet =
      'A a, B b, C c, Ç ç, D d, E e, F f, G g, Ğ ğ, H h, ' +
      'I ı, İ i, J j, K k, L l, M m, N n, O o, Ö ö, P p, ' +
      'R r, S s, Ş ş, T t, U u, Ü ü, V v, Y y, Z z'

    t.equal(slugify(alphabet, {locale: 'tr'}),
      'A-a-B-b-C-c-C-c-D-d-E-e-F-f-G-g-G-g-H-h-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-O-o-P-p-R-r-S-s-S-s-T-t-U-u-U-u-V-v-Y-y-Z-z'
    )
  })

  it('ka - georgian', function () {
    var alphabet =
      'ა, ბ, გ, დ, ე, ვ, ზ, თ, ი, კ, ლ, ' +
      'მ, ნ, ო, პ, ჟ, რ, ს, ტ, უ, ფ, ქ, ' +
      'ღ, ყ, შ, ჩ, ც, ძ, წ, ჭ, ხ, ჯ, ჰ'

    t.equal(slugify(alphabet),
      'a-b-g-d-e-v-z-t-i-k-l-m-n-o-p-zh-r-s-t-u-f-k-gh-q-sh-ch-ts-dz-ts-ch-kh-j-h'
    )
  })
})
