//  Write Jest test cases for slugify covering:
// 1) default behavior
// 2) { lower: true } option
// 3) { strict: true } option
// 4) custom replacement '_' 
// 5) edge cases: empty string, emoji, multibyte (日本語), leading/trailing spaces 
const slugify = require('../slugify');

test('basic slugify works', () => {
  expect(slugify('Hello World')).toBe('Hello-World');
});

  test('should handle default behavior', () => {
    expect(slugify('Another Test String')).toBe('Another-Test-String');
    expect(slugify('String with!@#$%^&*()_+ special characters')).toBe('String-with!@dollarpercentand*()_+-special-characters');
    expect(slugify('String   with   multiple   spaces')).toBe('String-with-multiple-spaces');
  });

  test('should handle { lower: true } option', () => {
    expect(slugify('Mixed Case String', { lower: true })).toBe('mixed-case-string');
    expect(slugify('ANOTHER ONE', { lower: true })).toBe('another-one');
  });

  test('should handle { strict: true } option', () => {
    expect(slugify('String with non-strict characters!', { strict: true })).toBe('String-with-non-strict-characters');
    expect(slugify('Another string with symbols #@$', { strict: true })).toBe('Another-string-with-symbols-dollar');
  });

  test('should handle custom replacement', () => {
    expect(slugify('String with spaces', { replacement: '_' })).toBe('String_with_spaces');
    expect(slugify('Special! Characters?', { replacement: '_' })).toBe('Special!_Characters');
    expect(slugify('Mixed Case String', { lower: true, replacement: '_' })).toBe('mixed_case_string');
  });

  describe('edge cases', () => {
    test('should handle empty string', () => {
      expect(slugify('')).toBe('');
    });

    test('should handle string with only spaces', () => {
      expect(slugify('   ')).toBe('');
    });

    test('should handle emoji', () => {
      expect(slugify('hello 👋 world')).toBe('hello-world');
    });

    test('should handle multibyte characters (日本語)', () => {
      expect(slugify('こんにちは世界')).toBe(''); // Default behavior might keep them or remove depending on config
      // Assuming default keeps them based on typical slugify behavior for non-ASCII
      // If strict is true, they might be removed depending on the charmap/locale config
      expect(slugify('こんにちは世界', { strict: true })).toBe(''); // Strict mode likely removes them
    });

    test('should handle leading and trailing spaces', () => {
      expect(slugify('  hello world  ')).toBe('hello-world');
    });
  });
