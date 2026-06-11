import { describe, it, expect } from 'vitest';
import { books } from '../data/books';
import type { Book } from '../types/book';

describe('Books Data', () => {
  it('should have 18 books', () => {
    expect(books).toHaveLength(18);
  });

  it('should have all required fields on every book', () => {
    books.forEach((book: Book) => {
      expect(book.id).toBeDefined();
      expect(typeof book.id).toBe('number');
      expect(book.title).toBeDefined();
      expect(typeof book.title).toBe('string');
      expect(book.title.length).toBeGreaterThan(0);
      expect(book.author).toBeDefined();
      expect(typeof book.author).toBe('string');
      expect(book.category).toBeDefined();
      expect(typeof book.category).toBe('string');
      expect(book.language).toBeDefined();
      expect(book.price).toBeDefined();
      expect(typeof book.price).toBe('number');
      expect(book.price).toBeGreaterThan(0);
      expect(book.image).toBeDefined();
      expect(typeof book.image).toBe('string');
      expect(book.rating).toBeDefined();
      expect(typeof book.rating).toBe('number');
      expect(book.rating).toBeGreaterThanOrEqual(1);
      expect(book.rating).toBeLessThanOrEqual(5);
      expect(book.description).toBeDefined();
      expect(typeof book.description).toBe('string');
      expect(book.description.length).toBeGreaterThan(0);
    });
  });

  it('should have valid categories', () => {
    const validCategories = ['History', 'Literature', 'Business', 'Language', 'Children', 'Culture'];
    books.forEach((book: Book) => {
      expect(validCategories).toContain(book.category);
    });
  });

  it('should have valid languages', () => {
    const validLanguages = ['Amharic', 'Afaan Oromo', 'English', 'Bilingual'];
    books.forEach((book: Book) => {
      expect(validLanguages).toContain(book.language);
    });
  });

  it('should have unique IDs', () => {
    const ids = books.map((b: Book) => b.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have at least one classic book', () => {
    const classics = books.filter((b: Book) => b.isClassic);
    expect(classics.length).toBeGreaterThan(0);
  });
});
