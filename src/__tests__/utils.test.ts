import {
  normalizeUrl,
  extractDomain,
  isValidUrl,
  truncateUrl,
} from '../utils/helpers';

describe('URL Helpers', () => {
  describe('normalizeUrl', () => {
    it('should add https protocol if missing', () => {
      expect(normalizeUrl('google.com')).toBe('https://google.com');
    });

    it('should preserve existing protocol', () => {
      expect(normalizeUrl('https://google.com')).toBe('https://google.com');
    });

    it('should treat simple text as search query', () => {
      expect(normalizeUrl('hello')).toContain('search?q=');
    });
  });

  describe('extractDomain', () => {
    it('should extract domain from URL', () => {
      expect(extractDomain('https://www.google.com/search')).toBe(
        'www.google.com'
      );
    });

    it('should handle invalid URLs', () => {
      expect(extractDomain('not a url')).toBe('not a url');
    });
  });

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://google.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not a url')).toBe(false);
      expect(isValidUrl('ht!tp://invalid')).toBe(false);
    });
  });

  describe('truncateUrl', () => {
    it('should truncate long URLs', () => {
      const url = 'https://www.verylongdomainname.com/very/long/path';
      const truncated = truncateUrl(url, 20);
      expect(truncated.length).toBeLessThanOrEqual(20);
      expect(truncated.endsWith('...')).toBe(true);
    });

    it('should not truncate short URLs', () => {
      const url = 'https://short.com';
      expect(truncateUrl(url, 20)).toBe(url);
    });
  });
});
