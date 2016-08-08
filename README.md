
# slugify

[![npm-version]][npm] [![travis-ci]][travis] [![coveralls-status]][coveralls]

This is vanilla javascript port of [node-slug](https://github.com/dodo/node-slug) so all credits goes to [dodo](https://github.com/dodo). The only difference here is that this port does not support unicode characters!

```js
var slugify = require('slugify')

// returns some-string
slugify('some string')

// if you prefer something else then '-' as seperator
slugify('some string', '_')
```

> Note that the original module [slug](https://www.npmjs.com/package/slug) has been ported to vanilla javascript.


  [npm-version]: http://img.shields.io/npm/v/slugify.svg?style=flat-square (NPM Package Version)
  [travis-ci]: https://img.shields.io/travis/simov/slugify/master.svg?style=flat-square (Build Status - Travis CI)
  [coveralls-status]: https://img.shields.io/coveralls/simov/slugify.svg?style=flat-square (Test Coverage - Coveralls)

  [npm]: https://www.npmjs.com/package/slugify
  [travis]: https://travis-ci.org/simov/slugify
  [coveralls]: https://coveralls.io/r/simov/slugify?branch=master
