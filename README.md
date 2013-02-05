# Slugify

This is vanilla javascript port of [node-slug](https://github.com/dodo/node-slug) so all credits goes to [dodo](https://github.com/dodo). The only difference is that this port does not support unicode characters!

##Install
```shell
$ npm install slugify
```

##Usage
```js
var slugify = require('slugify');

slugify('some string'); // returns some-string
slugify('some string', '_'); // if you prefer something else then '-' as seperator
```

##Tests
```shell
$ mocha
```
