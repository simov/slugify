// Test cases for slugify using Mocha and Chai
const { expect } = require('chai');
const slugify = require('../slugify');

describe('slugify', () => {
  // === Guard Clause (Type Checking) ===
  it('throws when called without any argument', () => {
    expect(() => slugify()).to.throw(Error);
  });
  it('throws when input is not a string', () => {
    expect(() => slugify(123)).to.throw(Error);
  });

  // === options.remove Variations ===
  it('should handle remove regex without g flag', () => {
    // remove all digits using regex without global flag
    expect(slugify('a1b2c', { remove: /[0-9]/ })).to.equal('abc');
  });
  it('should remove characters via options.remove regex', () => {
    // remove digits using global regex
    expect(slugify('abc123def', { remove: /[0-9]/g })).to.equal('abcdef');
    // remove character using string value
    expect(slugify('a_b_c', { remove: '_' })).to.equal('abc');
  });
  it('should ignore options.remove when it is falsy', () => {
    // remove:false should skip the remove logic
    expect(slugify('abc123', { remove: false })).to.equal('abc123');
  });

  // === Default Behavior ===
  it('basic slugify works', () => {
    expect(slugify('Hello World')).to.equal('Hello-World');
  });
  it('should handle default behavior for various inputs', () => {
    expect(slugify('Another Test String')).to.equal('Another-Test-String');
    expect(
      slugify('String   with   multiple   spaces')
    ).to.equal('String-with-multiple-spaces');
    expect(
      slugify('String with!@#$%^&*()_+ special characters')
    ).to.equal('String-with!@dollarpercentand*()_+-special-characters');
  });

  // === Case Conversion & Strict Mode ===
  it('should handle { lower: true } option', () => {
    expect(slugify('Mixed Case String', { lower: true })).to.equal(
      'mixed-case-string'
    );
    expect(slugify('ANOTHER ONE', { lower: true })).to.equal('another-one');
  });
  it('should handle { strict: true } option', () => {
    // strict mode removes symbols but keeps other mappings
    expect(
      slugify('String with non-strict characters!', { strict: true })
    ).to.equal('String-with-non-strict-characters');
    expect(
      slugify('Another string with symbols #@$', { strict: true })
    ).to.equal('Another-string-with-symbols-dollar');
  });

  // === Custom Replacement & Collapse ===
  it('should handle custom replacement character', () => {
    expect(
      slugify('String with spaces', { replacement: '_' })
    ).to.equal('String_with_spaces');
    expect(
      slugify('Special! Characters?', { replacement: '_' })
    ).to.equal('Special!_Characters');
    expect(
      slugify('Mixed Case String', { lower: true, replacement: '_' })
    ).to.equal('mixed_case_string');
  });
  it('should collapse consecutive replacement chars', () => {
    // multiple separators collapse into a single one
    expect(
      slugify('hello---world', { replacement: '-' })
    ).to.equal('hello-world');
  });
  it('should trim leading/trailing replacement chars (default trim=true)', () => {
    // default behavior removes separators at edges
    expect(
      slugify('-hello-world-', { replacement: '-' })
    ).to.equal('hello-world');
  });

  // === Edge Cases ===
  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(slugify('')).to.equal('');
    });
    it('should handle string with only spaces', () => {
      expect(slugify('   ')).to.equal('');
    });
    it('should handle emoji removal', () => {
      // assume non-alphanumeric are removed or replaced
      expect(slugify('hello 👋 world')).to.equal('hello-world');
    });
    it('should handle multibyte characters (Japanese)', () => {
      // default behavior removes non-ASCII
      expect(slugify('こんにちは世界')).to.equal('');
      // strict mode also removes them
      expect(slugify('こんにちは世界', { strict: true })).to.equal('');
    });
    it('should handle leading and trailing spaces', () => {
      expect(slugify('  hello world  ')).to.equal('hello-world');
    });
    it('should handle options as string shorthand for replacement', () => {
      // passing a string directly maps to replacement option
      expect(slugify('hello world', '_')).to.equal('hello_world');
    });
    it('should handle trim: false option', () => {
      expect(
        slugify('  hello world  ', { trim: false })
      ).to.equal('-hello-world-');
      expect(
        slugify('  hello world  ', { trim: false, replacement: '_' })
      ).to.equal('_hello_world_');
    });
  });

  // === extend() Method ===
  describe('extend method', () => {
    it('should allow extending the charmap and then resetting it', () => {
      slugify.extend({ '☢': 'radioactive' });
      expect(slugify('unicode ☢ hazard')).to.equal(
        'unicode-radioactive-hazard'
      );
      // reset extension for subsequent tests
      slugify.extend({ '☢': '' });
      expect(slugify('unicode ☢ hazard')).to.equal('unicode-hazard');
    });
  });

  // === Locale Handling ===
  describe('locale handling', () => {
    it('should use locale-specific mapping for Bulgarian', () => {
      // 'Й' maps to 'Y' in bg locale
      expect(slugify('Й', { locale: 'bg' })).to.equal('Y');
    });
    it('should use default mapping for non-ASCII by returning J for Й', () => {
      expect(slugify('Й')).to.equal('J');
    });
  });

  // === Special Character Mapping Cases ===
  describe('special character mapping cases', () => {
    it('should map en dash to hyphen and respect replacement char', () => {
      expect(slugify('hello–world')).to.equal('hello-world');
      expect(
        slugify('a – b', { replacement: '_' })
      ).to.equal('a_-_b');
    });
  });
});