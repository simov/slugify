
# Slugify – New Documentation Edition

Slugify converts any string into a URL-friendly slug. It is useful for web apps, blogs, SEO, etc.

Example: "Hello World!" to "hello-world"

## How to  Install
There are few ways to install terminall .Open your terminal and run the following command

It can be installed by using yarn .Enter the following command on your terminal

```
yarn add slugify
```



It can also be installed by using npm:

```bash
npm install slugify 
```


###  **Usage**

## Basic Usage

This example shows how to use the slugify package in a Node.js project to convert a string into a URL-friendly slug.

// Step 1: Import the 'slugify' module
const slugify = require('slugify');

// Step 2: Convert a string into a slug
const slug = slugify('Hello World!');

// Step 3: Print the result to the console
console.log(slug); // Output: hello-world

 The require('slugify') imports the slugify module into your file so you can use its functionality.

slugify('Hello World!') function call transforms the string 'Hello World!' into a slug. By default It replaces spaces with dashes (-),Converts all letters to lowercase ,removes or replaces special characters (like !).

You can customize  or change the setting or  the behavior by passing an options object:

slugify('Hello World!', {
  replacement: '-',    // Replace spaces with this character (default: '-')
  remove: /[*+~.()'"!:@]/g, // Remove these characters (RegEx)
  lower: true,         // Convert to lowercase (default: false)
  strict: true,        // Remove anything not allowed in URLs (default: false)
  locale: 'vi',        // Set locale (for language-specific transliteration)
  trim: true           // Trim leading/trailing separators (default: true)
});
 
 
 ## Remove Characters
  special characters Can be removed by  using the remove option.
  slugify('Hello *World*!', {
  remove: /[*+~.()'"!:@]/g
});
// Output: Hello-World



For example, to remove `*+~.()'"!:@` from the result slug, you can use `slugify('..', {remove: /[*+~.()'"!:@]/g})`.

* If the value of `remove` is a regular expression, it should be a
  [character class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
  and only a character class. It should also use the
  [global flag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global).
  (For example: `/[*+~.()'"!:@]/g`.) Otherwise, the `remove` option might not
  work as expected.
* If the value of `remove` is a string, it should be a single character.
  Otherwise, the `remove` option might not work as expected.

## Locales
When you convert a string to a slug, slugify replaces special or foreign characters (like é, ö, or ñ) with their closest English equivalents.Slugify uses a file called charmap.json. This file contains a big list of characters and their English versions.Let’s say charmap.json turns a letter into the wrong English letter for your language. For example, in Vietnamese or Turkish, some characters might have different meanings or sounds.You don’t change charmap.json directly.Instead, you add a custom correction in another file called locales.json



The main `charmap.json` file contains all known characters and their transliteration. All new characters should be added there first. In case you stumble upon a character already set in `charmap.json`, but not transliterated correctly according to your language, then you have to add those characters in `locales.json` to override the already existing transliteration in `charmap.json`, but for your locale only.

You can get the correct language code of your language from [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

## Extend

Out of the box `slugify` comes with support for a handful of Unicode symbols. For example the `☢` (radioactive) symbol is not defined in the [`charMap`][charmap] and therefore it will be stripped by default:

```js
slugify('unicode ♥ is ☢') // unicode-love-is
```

However you can extend the supported symbols, or override the existing ones with your own:

```js
slugify.extend({'☢': 'radioactive'})
slugify('unicode ♥ is ☢') // unicode-love-is-radioactive
```

Keep in mind that the `extend` method extends/overrides the default `charMap` for the entire process. In case you need a fresh instance of the slugify's `charMap` object you have to clean up the module cache first:

```js
delete require.cache[require.resolve('slugify')]
var slugify = require('slugify')
```

## Contribute

1. Add chars to `charmap.json`
2. Run tests `npm test`
3. The tests will build the charmap in `index.js` and will sort the `charmap.json`
4. Commit **all** modified files

---

> Originally this was a vanilla javascript port of [node-slug][node-slug].<br>
> Note that the original [slug][slug] module has been ported to vanilla javascript too.


  [npm-version]: https://img.shields.io/npm/v/slugify.svg?style=flat-square (NPM Package Version)
  [coveralls-status]: https://img.shields.io/coveralls/simov/slugify.svg?style=flat-square (Test Coverage - Coveralls)

  [npm]: https://www.npmjs.com/package/slugify
  [coveralls]: https://coveralls.io/r/simov/slugify?branch=master

  [node-slug]: https://github.com/dodo/node-slug
  [slug]: https://www.npmjs.com/package/slug
  [unicode]: https://www.npmjs.com/package/unicode
  [index]: https://github.com/simov/slugify/blob/master/index.js
  [charmap]: https://github.com/simov/slugify/blob/master/config/charmap.json
